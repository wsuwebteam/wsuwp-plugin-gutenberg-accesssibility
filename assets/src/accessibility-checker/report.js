import DetailsView from "./details-view";
const { ExternalLink } = wp.components;

const ReportTable = (props) => {
	return (
		<>
			{props.logs.length > 0 ? (
				<>
					<table className="wsu-gutenberg-accessibility-panel__report-table">
						<tbody>
							{props.logs.map((l, idx) => {
								return (
									<tr
										key={`${props.type}-${idx}`}
										className="wsu-gutenberg-accessibility-panel__report-table-row"
									>
										<td>{l.message}</td>
										<td>
											{l.detailsView && (
												<DetailsView
													label={l.detailsViewLabel}
												>
													<l.detailsView />
												</DetailsView>
											)}
										</td>
									</tr>
								);
							})}
						</tbody>
					</table>
				</>
			) : (
				<p className="wsu-gutenberg-accessibility-panel__report-empty-message">
					{props.emptyMessage}
				</p>
			)}
		</>
	);
};

const Report = (props) => {
	const { report, isLoading, error, permalink } = props;

	const reportSections = [
		{
			label: "Errors",
			description: (
				<p>
					These items <strong>MUST</strong> be fixed.
				</p>
			),
			icon: "dismiss",
			logs: report.errors,
		},
		{
			label: "Alerts",
			description: (
				<p>
					These items <strong>SHOULD</strong> be fixed.
				</p>
			),
			icon: "warning",
			logs: report.alerts,
		},
		{
			label: "Warnings",
			description: (
				<p>
					These items <strong>MAY</strong> need fixing. A manual check
					is needed.
				</p>
			),
			icon: "flag",
			logs: report.warnings,
		},
	];

	return (
		<>
			{!isLoading && !error ? (
				<>
					<p>
						Learn about the items checked by the{" "}
						<a href="https://web.wsu.edu/web-training/plugin-training/wsuwp-gutenberg-accessibility/#accessibility-panel">
							Accessibility & Usability Panel
						</a>
					</p>
					{reportSections.map((section) => (
						<div
							key={`section-${section.label}`}
							className="wsu-gutenberg-accessibility-panel__section"
						>
							<h3 className="wsu-gutenberg-accessibility-panel__section-heading">
								<span
									className={`dashicon dashicons dashicons-${section.icon}`}
								></span>{" "}
								{section.label}
							</h3>
							{section.description}
							<ReportTable
								type={section.label}
								logs={section.logs}
								emptyMessage={`✅ 0 ${section.label.toLowerCase()} to display.`}
							/>
						</div>
					))}
				</>
			) : error ? (
				<p>💥 {error}</p>
			) : (
				<p>loading...</p>
			)}

			<p>
				Review your webpage in WAVE for other accessibility errors and
				alerts not caught by our Accessibility & Usability Panel.
			</p>
			<ExternalLink
				className="wsu-gutenberg-accessibility-panel__wave-link"
				href={`https://wave.webaim.org/report#/` + permalink}
			>
				Review on WAVE
			</ExternalLink>
		</>
	);
};

export default Report;
