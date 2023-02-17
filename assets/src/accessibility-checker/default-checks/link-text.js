const linkTextCheck = (report, doc) => {
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

	function checkForUrlProtocols(report, links) {
		const reportLinks = links.filter((l) => {
			const text = l.textContent.trim().toLowerCase();

			if (
				!l.ariaLabel &&
				(text.startsWith("http://") || text.startsWith("https://"))
			) {
				return true;
			}

			return false;
		});

		if (reportLinks.length > 0) {
			const plural = reportLinks.length > 1 ? "s" : "";
			report.warnings.push({
				message: `${reportLinks.length} link${plural} containing the URL protocol (http://, https://) in the link text`,
				detailsViewLabel: "Link text containing the URL protocol",
				detailsView: detailsView.bind(
					this,
					reportLinks,
					"Link text should not contain the URL protocol (http://, https://). Link text without the URL protocol should be relatively short, such as the website's homepage. If you have a long URL consider using a text link instead of a URL."
				),
			});
		}
	}

	function checkForLongUrlText(report, links) {
		const regex = new RegExp(
			"^(https?://)?([a-zA-Z0-9-]+.[a-zA-Z]+)+/[a-zA-Z0-9/?=#.]+$"
		);

		const reportLinks = links.filter((l) => {
			if (l.ariaLabel) {
				return false;
			}

			const text = l.textContent.trim().toLowerCase();

			return regex.test(text);
		});

		if (reportLinks.length > 0) {
			const plural = reportLinks.length > 1 ? "s" : "";
			report.warnings.push({
				message: `${reportLinks.length} link${plural} may contain a long URL in the link text`,
				detailsViewLabel: "Link text containing a long URL",
				detailsView: detailsView.bind(
					this,
					reportLinks,
					"Link text containing a URL should be relatively short, such as the website's homepage without the URL protocol (http://, https://). If you have a long URL consider using a text link instead of a URL."
				),
			});
		}
	}

	function checkForGenericText(report, links) {
		const genericText = [
			"click here",
			"get more info",
			"get more information",
			"here",
			"learn more",
			"more here",
			"more info",
			"more",
			"see more info",
			"see more information",
			"see more",
			"view more",
		];

		const reportLinks = links.filter((l) => {
			const text = l.textContent.trim().toLowerCase();

			if (!l.ariaLabel && genericText.includes(text)) {
				return true;
			}

			return false;
		});

		if (reportLinks.length > 0) {
			const plural = reportLinks.length > 1 ? "s" : "";
			report.alerts.push({
				message: `${reportLinks.length} link${plural} with generic text`,
				detailsViewLabel: "Links with generic text",
				detailsView: detailsView.bind(this, reportLinks),
			});
		}
	}

	// TODO: Probably should optimize so we're only iterating the link list once
	checkForUrlProtocols(report, links);
	checkForGenericText(report, links);
	checkForLongUrlText(report, links);

	return report;
};

wp.hooks.addFilter(
	"wsu.Accessibility",
	"wsuwp/accessibility-checker",
	linkTextCheck
);
