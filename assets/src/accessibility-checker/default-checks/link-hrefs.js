const linkHrefsCheck = (report, doc) => {
	const missingHrefs = [];
	const targetBlanks = [];
	const links = Array.from(doc.querySelectorAll("a"));

	function detailsView(links, desc) {
		return (
			<>
				{lodash.isString(desc) && <p>{desc}</p>}
				<table className="wsu-gutenberg-accessibility-panel__details-table">
					<thead>
						<tr>
							<th>Link Text</th>
							<th>Href</th>
						</tr>
					</thead>
					<tbody>
						{links.map((l, idx) => (
							<tr key={`link-` + idx}>
								<td>
									{l.textContent ||
										"(Not found. Possibly an image link)"}
								</td>
								<td>{l.getAttribute("href")}</td>
							</tr>
						))}
					</tbody>
				</table>
			</>
		);
	}

	links.forEach((l) => {
		const href = l.getAttribute("href");
		const target = l.getAttribute("target");

		if (
			href === null ||
			href.trim() === "" ||
			href.trim() === "#" ||
			href.trim() === "http://" ||
			href.trim() === "https://"
		) {
			missingHrefs.push(l);
		}

		if (target === "_blank") {
			targetBlanks.push(l);
		}
	});

	if (missingHrefs.length > 0) {
		const plural = missingHrefs.length > 1 ? "s" : "";
		report.errors.push({
			message: `${missingHrefs.length} link${plural} with missing or invalid href${plural}`,
			detailsViewLabel: "Links with missing or invalid hrefs",
			detailsView: detailsView.bind(this, missingHrefs),
		});
	}

	if (targetBlanks.length > 0) {
		const plural = targetBlanks.length > 1 ? "s" : "";
		report.alerts.push({
			message: `${targetBlanks.length} link${plural} set to open in a new tab`,
			detailsViewLabel: "Links set to open in a new tab",
			detailsView: detailsView.bind(
				this,
				targetBlanks,
				"Links opening in a new window causes accessibility, usability, and security problems. Consider removing open in a new window. Or adding additional information to the link that indicates the link opens into a new window."
			),
		});
	}

	return report;
};

wp.hooks.addFilter(
	"wsu.Accessibility",
	"wsuwp/accessibility-checker",
	linkHrefsCheck
);
