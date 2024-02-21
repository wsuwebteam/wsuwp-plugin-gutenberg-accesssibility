// FIXME: Doesn't work on the first save because the endpoint requires a postId
import ReportPanel from "./report-panel";
import Report from "./report";
import useOutputMarkup from "./hooks/use-output-markup";
import useFetch from "./hooks/use-fetch";

const registerPlugin = wp.plugins.registerPlugin;
const { useEffect, useRef, useState } = wp.element;
const { useSelect } = wp.data;

const AccessibilityChecker = () => {
	const [report, setReport] = useState(() => getEmptyReport());
	const abortControllerRef = useRef(null);

	const { postTitle, postId, editedPostContent, permalink, isSaving } =
		useSelect((select) => {
			const editor = select("core/editor");
			return {
				postTitle: editor.getEditedPostAttribute("title"), // subscribing to changes here so we receive live feedback in the panel
				postId: editor.getCurrentPostId(),
				editedPostContent: editor.getEditedPostContent(),
				permalink: editor.getPermalink(),
				isSaving: editor.isSavingPost() || editor.isAutosavingPost(),
			};
		});

	const { html, isLoading, error } = useOutputMarkup(
		postId,
		editedPostContent
	);

	function getEmptyReport() {
		return {
			errors: {
				items: [],
			},
			alerts: {
				items: [],
			},
			warnings: {
				items: [],
			},
		};
	}

	useEffect(() => {
		if (isSaving) {
			abortControllerRef.current?.abort();

			if (typeof AbortController !== "undefined") {
				abortControllerRef.current = new AbortController();
			}

			fetch(
				WSUWP_ACCESSIBILITY_PLUGIN_DATA.siteUrl +
					`/wp-json/wsu-gutenberg-accessibility/v1/update-accessibility-report`,
				{
					method: "POST",
					body: new URLSearchParams({
						postId: postId,
						report: JSON.stringify(report),
					}),
					signal: abortControllerRef.current?.signal,
				}
			);
		}
	}, [isSaving]);

	return (
		<ReportPanel>
			{!isLoading && !error && html ? (
				<ReportGenerator
					html={html}
					postTitle={postTitle}
					permalink={permalink}
					report={report}
					setReport={setReport}
				/>
			) : !isLoading && !error && !html ? (
				<p>No HTML to Review</p>
			) : error ? (
				<p>💥 {error}</p>
			) : isLoading ? (
				<p>loading...</p>
			) : (
				""
			)}
		</ReportPanel>
	);
};

function ReportGenerator(props) {
	const { html, report, setReport, permalink, postTitle } = props;

	const { data, isLoading, error } = useFetch(
		"https://api.web.wsu.edu/accessibility-checker/v1/get-report",
		{
			method: "POST",
			mode: "cors",
			cache: "no-cache",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				title: postTitle,
				html: html,
			}),
		},
		[html, postTitle]
	);

	useEffect(() => {
		if (data && !error) {
			console.log(data);
			setReport(data);
		}
	}, [data]);

	return (
		<Report
			report={report}
			permalink={permalink}
			isLoading={isLoading}
			error={error}
		/>
	);
}

const AccessibilityCheckerInitiator = () => {
	// const status = wp.data.select("core/editor").getCurrentPost().status;
	// return status !== "auto-draft" && <AccessibilityChecker />;

	const lastRevisionId = wp.data
		.select("core/editor")
		.getCurrentPostLastRevisionId();

	return lastRevisionId !== null && <AccessibilityChecker />;
};

registerPlugin("wsu-plugin-accessibility", {
	render: AccessibilityCheckerInitiator,
	icon: "",
});
