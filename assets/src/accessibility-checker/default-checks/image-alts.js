const imageAltsCheck = (report, doc) => {
	const missingAlts = [];
	const linkedImagesMissingAlts = [];
	const linkedImagesWithAlts = [];
	const images = Array.from(doc.querySelectorAll("img"));

	function detailsView(imgs, showAlt, desc) {
		return (
			<>
				<p>{desc}</p>
				<table className="wsu-gutenberg-accessibility-panel__details-table">
					<thead>
						<tr>
							{/* <th>Media ID</th> */}
							<th>Preview</th>
							<th>Filename</th>
							{showAlt && <th>Alt Text</th>}
						</tr>
					</thead>
					<tbody>
						{imgs.map((i, idx) => {
							// const id = extractId(i.className);
							const filename = i
								.getAttribute("src")
								?.split("/")
								.pop();
							const alt = i.alt?.trim();
							return (
								<tr key={`image-` + idx}>
									{/* <td>{id}</td> */}
									<td>
										<img src={i.getAttribute("src")} />
									</td>
									<td>{filename}</td>
									{showAlt && <td>{alt}</td>}
								</tr>
							);
						})}
					</tbody>
				</table>
			</>
		);
	}

	images.forEach((i) => {
		const link = i.closest("a");
		const alt = i.alt.trim();

		if (!alt && !link) {
			missingAlts.push(i);
		} else if (link && link.tabIndex !== -1 && !alt) {
			linkedImagesMissingAlts.push(i);
		} else if (link && alt) {
			linkedImagesWithAlts.push(i);
		}
	});

	if (missingAlts.length > 0) {
		const plural = missingAlts.length > 1 ? "s" : "";
		report.warnings.push({
			message: `${missingAlts.length} image${plural} missing alt text`,
			detailsViewLabel: "Images missing alt text",
			detailsView: detailsView.bind(
				this,
				missingAlts,
				false,
				"The image is missing alternative text the describes the image content or function. Use an empty alt text only if the image is decorative."
			),
		});
	}

	if (linkedImagesMissingAlts.length > 0) {
		const plural = linkedImagesMissingAlts.length > 1 ? "s" : "";
		report.errors.push({
			message: `${linkedImagesMissingAlts.length} linked image${plural} missing alt text`,
			detailsViewLabel: "Linked images missing alt text",
			detailsView: detailsView.bind(
				this,
				linkedImagesMissingAlts,
				false,
				"The linked image is missing alternative text that describes the image function or destination."
			),
		});
	}

	if (linkedImagesWithAlts.length > 0) {
		const plural = linkedImagesWithAlts.length > 1 ? "s" : "";
		report.warnings.push({
			message: `${linkedImagesWithAlts.length} image${plural} where alt text should be the destination`,
			detailsViewLabel: "Images where alt text should be the destination",
			detailsView: detailsView.bind(
				this,
				linkedImagesWithAlts,
				true,
				"The linked image should have an alternative text that describes the image function or destination."
			),
		});
	}

	return report;
};

wp.hooks.addFilter(
	"wsu.Accessibility",
	"wsuwp/accessibility-checker",
	imageAltsCheck
);
