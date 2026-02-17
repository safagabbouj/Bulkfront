import { Dialog } from "primereact/dialog";

const PopupsLayout = ({ visible, onHide, headerContent, bodyContent, footerContent }) => {
    return (
        <Dialog
            header={headerContent}
            footer={footerContent}
            visible={visible}
            onHide={onHide}
            modal
            draggable={false}
            closable
            style={{
                width: "40%",
                backgroundColor: "whitesmoke",
                padding: "1%",
                borderRadius: "10px",
            }}
            breakpoints={{
                "960px": "75vw",
                "640px": "95vw",
            }}
        >
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    backgroundColor: "whitesmoke",
                    justifyContent: "center",
                }}
            >
                {bodyContent}
            </div>
        </Dialog>
    );
};

export default PopupsLayout;
