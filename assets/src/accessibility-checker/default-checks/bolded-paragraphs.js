const boldedParagraphsCheck = (report, doc) => {
	const boldedParagraphs = [];
	const paragraphs = Array.from(doc.querySelectorAll("p"));

	function isDescendant(parent, child) {
		let node = child.parentNode;
		while (node) {
			if (node === parent) {
				return true;
			}

			// Traverse up to the parent
			node = node.parentNode;
		}

		// Go up until the root but couldn't find the `parent`
		return false;
	}

	function detailsView(boldedParagraphs) {
		return (
			<>
				<p>
					Avoid bold text used to define a section heading. Turn bold
					text "headings" into the appropriate heading level for the
					structure of the content.
				</p>

				<table className="wsu-gutenberg-accessibility-panel__details-table">
					<thead>
						<tr>
							<th>Paragraph Text</th>
						</tr>
					</thead>
					<tbody>
						{boldedParagraphs.map((p, idx) => (
							<tr key={`para-` + idx}>
								<td>{p}</td>
							</tr>
						))}
					</tbody>
				</table>
			</>
		);
	}

	paragraphs.forEach((p) => {
		const text = p.textContent;

		if (text.trim() !== "") {
			const boldElements = Array.from(p.querySelectorAll("strong, b"));

			boldElements.forEach((e) => {
				if (isDescendant(p, e)) {
					e.parentNode.removeChild(e);
				}
			});

			if (p.textContent.trim() === "") {
				const more = text.length > 75 ? "…" : "";
				boldedParagraphs.push(text.substring(0, 75).trim() + more);
			}
		}
	});

	if (boldedParagraphs.length > 0) {
		const plural = boldedParagraphs.length > 1 ? "s" : "";
		const singular = boldedParagraphs.length === 1 ? "s" : "";
		report.warnings.push({
			message: `${boldedParagraphs.length} paragraph${plural} contain${singular} only bold text`,
			detailsViewLabel: "Paragraphs with only bolded text",
			detailsView: detailsView.bind(this, boldedParagraphs),
		});
	}

	return report;
};

wp.hooks.addFilter(
	"wsu.Accessibility",
	"wsuwp/accessibility-checker",
	boldedParagraphsCheck
);
