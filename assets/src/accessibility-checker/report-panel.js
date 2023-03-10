import Report from "./report";

const { PluginDocumentSettingPanel } = wp.editPost;

const ReportPanel = (props) => {
    return (
        <PluginDocumentSettingPanel
            name="wsu-accessibility"
            title="Accessibility & Usability"
            className="wsu-gutenberg-accessibility-panel"
        >
            <Report {...props} />
        </PluginDocumentSettingPanel>
    );
};

export default ReportPanel;
