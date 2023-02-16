// FIXME: Doesn't work on the first save because the endpoint requires a postId
// FIXME: If the editor clicks save before the report finishes loading the meta data will be lost. Could lock the save buttons during load?
import ReportPanel from "./report-panel";
import { useOutputMarkup } from "./hooks";
import "./default-checks";

const registerPlugin = wp.plugins.registerPlugin;
const { applyFilters } = wp.hooks;
const { useSelect, useDispatch } = wp.data;

const AccessibilityChecker = () => {
	const report = {
		errors: [],
		alerts: [],
		warnings: [],
		data: {},
	};

	const { editPost } = useDispatch("core/editor");
	const { editor, postId, editedPostContent, permalink, isSaving } =
		useSelect((select) => {
			const editor = select("core/editor");
			return {
				editor: editor,
				postTitle: editor.getEditedPostAttribute("title"), // subscribing to changes here only for live feedback in panel
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

	if (html !== null) {
		const parser = new DOMParser();
		const doc = parser.parseFromString(html, "text/html");

		applyFilters("wsu.Accessibility", report, doc, editor);

		setTimeout(() => {
			editPost({
				meta: {
					wsuwp_accessibility_report: JSON.stringify(report),
				},
			});
		}, 0);
	}

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
