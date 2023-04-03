// FIXME: Doesn't work on the first save because the endpoint requires a postId
import ReportPanel from "./report-panel";
import { useOutputMarkup } from "./hooks";
import "./default-checks";

const registerPlugin = wp.plugins.registerPlugin;
const { applyFilters } = wp.hooks;
const { useEffect, useRef, useState } = wp.element;
const { useSelect } = wp.data;

const AccessibilityChecker = () => {
	const [report, setReport] = useState(() => getEmptyReport());
	const abortControllerRef = useRef(null);

	const { editor, postId, editedPostContent, permalink, isSaving } =
		useSelect((select) => {
			const editor = select("core/editor");
			return {
				editor: editor,
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
			errors: [],
			alerts: [],
			warnings: [],
			data: {},
		};
	}

	function updateReport(html, editor) {
		const parser = new DOMParser();
		const doc = parser.parseFromString(html, "text/html");
		const newReport = getEmptyReport();

		applyFilters("wsu.Accessibility", newReport, doc, editor);

		setReport(newReport);
	}

	useEffect(() => {
		if (isSaving) {
			abortControllerRef.current?.abort();

			if (typeof AbortController !== "undefined") {
				abortControllerRef.current = new AbortController();
			}

			fetch(
				WSUWP_DATA.siteUrl +
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

	useEffect(() => {
		if (html === null) {
			return;
		}

		updateReport(html, editor);
	}, [html]);

	return (
		<ReportPanel
			report={report}
			isLoading={isLoading}
			error={error}
			permalink={permalink}
		/>
	);
};

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
