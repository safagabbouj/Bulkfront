import React, { useMemo, useState } from "react";
import MainLayout from "../../../layout/MainLayout";
import CampaignList from "./CampaignList";
import AddCampaignModal from "./AddCampaignModal";
import DetailsCampaignModal from "./DetailsCampaignModal";

import "./GestionDesCampagnes.css";

const SEED_CAMPAIGNS = [
  {
    id: 1,
    name: "Test01",
    status: "Enregistré",
    language: "Français",
    dateCreation: "04/06/2023 10:06",
    dateEnvoi: "04/06/2023 10:06",
    dateFin: "04/06/2023 10:06",
    type: ["SMS"],
    description: "Campagne test",
    message: "Hello",
    entete: "Orange",
  },
  {
    id: 2,
    name: "Promo Janvier",
    status: "Envoyé",
    language: "Français",
    dateCreation: "05/06/2023 11:10",
    dateEnvoi: "06/06/2023 09:00",
    dateFin: "06/06/2023 10:00",
    type: ["Mail"],
    description: "Promo",
    message: "Promo -50%",
    entete: "Orange",
  },
];

const STATUTS = ["Enregistré", "Envoyé", "En cours", "Annulé"];

export default function GestionDesCampagnes() {
  const [campaigns, setCampaigns] = useState(SEED_CAMPAIGNS);

  // filters (like Contacts)
  const [filterStatus, setFilterStatus] = useState("");
  const [filterDateCreation, setFilterDateCreation] = useState("");
  const [filterDateEnvoi, setFilterDateEnvoi] = useState("");
  const [q, setQ] = useState("");

  // modals
  const [showAdd, setShowAdd] = useState(false);
  const [detailsItem, setDetailsItem] = useState(null);

  const matchByDate = (dateStr, filterDate) => {
    if (!filterDate) return true;
    // dateStr 
    const [dmy] = dateStr.split(" ");
    const [dd, mm, yyyy] = dmy.split("/");
    const iso = `${yyyy}-${mm}-${dd}`;
    return iso === filterDate;
  };

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();

    return campaigns.filter((it) => {
      const matchStatus = filterStatus ? it.status === filterStatus : true;

      const matchSearch = s
        ? it.name.toLowerCase().includes(s) ||
          it.status.toLowerCase().includes(s) ||
          it.language.toLowerCase().includes(s)
        : true;

      const matchCreation = matchByDate(it.dateCreation, filterDateCreation);
      const matchEnvoi = matchByDate(it.dateEnvoi, filterDateEnvoi);

      return matchStatus && matchSearch && matchCreation && matchEnvoi;
    });
  }, [campaigns, q, filterStatus, filterDateCreation, filterDateEnvoi]);

  // ADD
  const addCampaign = (payload) => {
    setCampaigns((prev) => [{ ...payload, id: Date.now() }, ...prev]);
  };

  return (
    <MainLayout pageTitle="Gestion des campagnes" pageSubtitle="Liste des campagnes">
      <div className="gestion-campagnes-container">
        <CampaignList
          items={filtered}
          statuts={STATUTS}
          filterStatus={filterStatus}
          setFilterStatus={setFilterStatus}
          filterDateCreation={filterDateCreation}
          setFilterDateCreation={setFilterDateCreation}
          filterDateEnvoi={filterDateEnvoi}
          setFilterDateEnvoi={setFilterDateEnvoi}
          q={q}
          setQ={setQ}
          onAddCampaign={() => setShowAdd(true)}
          onOpenDetails={(item) => setDetailsItem(item)}
        />

        {showAdd && (
          <AddCampaignModal
            statuts={STATUTS}
            onClose={() => setShowAdd(false)}
            onSubmit={(form) => {
              // defaults like your table
              addCampaign({
                name: form.name || "New Campaign",
                status: form.status || "Enregistré",
                language: form.language || "Français",
                dateCreation: form.dateCreationLabel,
                dateEnvoi: form.dateEnvoiLabel,
                dateFin: form.dateFinLabel,
                type: form.type,
                description: form.description,
                message: form.message,
                entete: form.entete,
              });
            }}
          />
        )}

        {detailsItem && (
          <DetailsCampaignModal item={detailsItem} onClose={() => setDetailsItem(null)} />
        )}
      </div>
    </MainLayout>
  );
}
