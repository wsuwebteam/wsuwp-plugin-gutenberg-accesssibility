const { useState, useEffect, useRef } = wp.element;
const { useSelect } = wp.data;

const useOutputMarkup = function (postId, gutenbergContent) {
	const [output, setOutput] = useState({
		html: null,
		isLoading: false,
		error: null,
	});
	const abortControllerRef = useRef(null);

	useEffect(() => {
		try {
			setOutput({
				html: null,
				isLoading: true,
				error: null,
			});

			abortControllerRef.current?.abort();

			if (typeof AbortController !== "undefined") {
				abortControllerRef.current = new AbortController();
			}

			(async () => {
				const response = await fetch(
					WSUWP_ACCESSIBILITY_PLUGIN_DATA.siteUrl +
						`/wp-json/wsu-gutenberg-accessibility/v1/parse-gutenberg-content`,
					{
						method: "POST",
						body: new URLSearchParams({
							postId: postId,
							content: gutenbergContent,
						}),
						signal: abortControllerRef.current?.signal,
					}
				);

				const responseJson = await response.json();

				if (response.ok) {
					setOutput({
						html: responseJson.html,
						isLoading: false,
						error: null,
					});
				} else {
					setOutput({
						html: null,
						isLoading: false,
						error: `${responseJson.code} | ${responseJson.message} ${response.status} (${response.statusText})`,
					});
				}
			})();

			return () => {
				abortControllerRef.current?.abort();
			};
		} catch (ex) {
			setOutput({
				html: null,
				isLoading: false,
				error: ex.message,
			});
		}
	}, [postId, gutenbergContent]);

	return output;
};

const usePostSaved = () => {
	const is_saving = useSelect((select) =>
		select("core/editor").isSavingPost()
	);
	const [was_saving, setWasSaving] = useState(is_saving);

	if (was_saving) {
		if (!is_saving) {
			setWasSaving(false);

			return true;
		}
	} else if (is_saving) {
		setWasSaving(true);
	}

	return false;
};

export { useOutputMarkup, usePostSaved };
