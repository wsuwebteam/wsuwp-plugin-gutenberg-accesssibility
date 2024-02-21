import Report from "./report";

const { PluginDocumentSettingPanel } = wp.editPost;

const ReportPanel = (props) => {
	return (
		<PluginDocumentSettingPanel
			name="wsu-accessibility"
			title="Accessibility & Usability"
			className="wsu-gutenberg-accessibility-panel"
		>
			{props.children}
		</PluginDocumentSettingPanel>
	);
};

export default ReportPanel;
