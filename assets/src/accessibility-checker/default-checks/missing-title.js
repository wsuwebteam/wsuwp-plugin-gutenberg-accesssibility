const missingTitleCheck = (report, doc, editor) => {
	const pageTitle = editor.getEditedPostAttribute("title");

	function detailsView() {
		return (
			<>
				<p>
					A unique descriptive page title helps people understand the
					webpage's topic or purpose, especially for those using
					assistive technology.
				</p>
			</>
		);
	}

	if (pageTitle.trim() === "") {
		report.errors.push({
			message: `Missing page title`,
			detailsViewLabel: "Missing page title",
			detailsView: detailsView.bind(this),
		});
	}

	return report;
};

wp.hooks.addFilter(
	"wsu.Accessibility",
	"wsuwp/accessibility-checker",
	missingTitleCheck
);
