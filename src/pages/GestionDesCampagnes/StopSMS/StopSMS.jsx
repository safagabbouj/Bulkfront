// import MainLayout from "../../.layout/MainLayout";
import MainLayout from "../../../layout/MainLayout";
import StopSMSHeader from "./components/StopSMSHeader";
import UploadBox from "./components/UploadBox";
import FileItem from "./components/FileItem";
import "./StopSMS.css";

const StopSMS = () => {
  return (
    <MainLayout pageTitle="Gestion des campagnes" pageSubtitle="Stop SMS">
      <div className="stop-sms-container">
        <StopSMSHeader />
        <UploadBox />
        <FileItem />
      </div>
    </MainLayout>
  );
};

export default StopSMS;
