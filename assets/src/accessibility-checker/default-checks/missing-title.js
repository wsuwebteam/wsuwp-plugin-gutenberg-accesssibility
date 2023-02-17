const missingTitleCheck = (report, doc, editor) => {
    const pageTitle = editor.getEditedPostAttribute("title");

    if (pageTitle.trim() === "") {
        report.errors.push({
            message: `Missing page title`,
        });
    }

    return report;
};

wp.hooks.addFilter(
    "wsu.Accessibility",
    "wsuwp/accessibility-checker",
    missingTitleCheck
);
