const headingOrderCheck = (report, doc) => {
	let previousHeadingLevel = doc.querySelector("h1") === null ? 1 : 0;
	const headings = Array.from(doc.querySelectorAll("h1, h2, h3, h4, h5, h6"));

	function getHeadingLevel(heading) {
		return parseInt(heading.tagName[1]);
	}

	function detailsView(headingData) {
		return (
			<>
				<p>
					Use a hierarchical sequence of headings. Headings provide an
					outline of your content and facilitate people navigating
					through the webpage.
				</p>
				<table className="wsu-gutenberg-accessibility-panel__details-table">
					<thead>
						<tr>
							<th>Valid</th>
							<th>Level</th>
							<th>Content</th>
						</tr>
					</thead>
					<tbody>
						{headingData.map((h, idx) => (
							<tr key={`heading-` + idx}>
								<td>
									<span
										className={`dashicon dashicons dashicons-${h.icon}`}
									></span>
								</td>
								<td>{h.tag}</td>
								<td>{h.content}</td>
							</tr>
						))}
					</tbody>
				</table>
			</>
		);
	}

	let hasFailed = false;
	const headingData = headings.map((h) => {
		const headingLevel = getHeadingLevel(h);
		const isValid = !(headingLevel > previousHeadingLevel + 1);
		const icon = hasFailed ? "minus" : isValid ? "yes-alt" : "warning";
		previousHeadingLevel = headingLevel;

		hasFailed = hasFailed === true ? true : !isValid;

		return {
			icon: icon,
			tag: h.tagName,
			content: h.textContent,
		};
	});

	if (hasFailed) {
		report.alerts.push({
			message: "Incorrect heading order",
			detailsViewLabel: "Incorrect heading order",
			detailsView: detailsView.bind(this, headingData),
		});
	}

	return report;
};

wp.hooks.addFilter(
	"wsu.Accessibility",
	"wsuwp/accessibility-checker",
	headingOrderCheck
);
