import React, { useState } from "react";
import MainLayout from "../../layout/MainLayout";
import { Trash2 } from "lucide-react";
import "./Reporting.css";
import DetailsReportingModal from "./DetailsReportingModal";
import ConfirmModal from "../GestionDesCampagnes/ListeDesCampagnes/ConfirmModal";

const campaignsRows = [
  {
    id: 1,
    name: "Campagne_022",
    type: "Campagne_type",
    msgType: "Campagne_type_message",
    action: "Détails »",
    // Données supplémentaires pour le modal
    status: "Envoyé",
    language: "Français",
    dateCreation: "04/06/2023 10:06",
    dateEnvoi: "04/06/2023 10:06",
    dateFin: "04/06/2023 10:06",
    description: "Description de la campagne 022",
    message: "Message de la campagne 022",
    entete: "Orange",
  },
  {
    id: 2,
    name: "Campagne_023",
    type: "Campagne_type",
    msgType: "Campagne_type_message",
    action: "Détails »",
    // Données supplémentaires pour le modal
    status: "En cours",
    language: "Français",
    dateCreation: "05/06/2023 11:10",
    dateEnvoi: "06/06/2023 09:00",
    dateFin: "06/06/2023 10:00",
    description: "Description de la campagne 023",
    message: "Message de la campagne 023",
    entete: "Orange",
  },
];

const shortUrlRows = [
  { url: "http://MyNewMessagingPro...", short: "http://MyNewMessagingPro...", vues: 14, campagne: "Campagne_num", creation: "31-07-2023" },
  { url: "http://MyNewMessagingPro...", short: "http://MyNewMessagingPro...", vues: 14, campagne: "Campagne_num", creation: "31-07-2023" },
];

const userRows = [
  { prenom: "", nom: "", email: "", mobile: "", roles: "", campaigns: "" },
];

function Donut({ title, total, centerLabel, segments }) {
  // segments: [{label, value, color, note}]
  const totalSeg = segments.reduce((s, x) => s + x.value, 0) || 1;
  let acc = 0;
  const stops = segments.map((s) => {
    const start = (acc / totalSeg) * 360;
    acc += s.value;
    const end = (acc / totalSeg) * 360;
    return `${s.color} ${start}deg ${end}deg`;
  });

  return (
    <div className="repCard repDonutCard">
      <div className="repCardTitle">{title}</div>

      <div className="repDonutWrap">
        <div
          className="repDonut"
          style={{
            background: `conic-gradient(${stops.join(",")})`,
          }}
        >
          <div className="repDonutCenter">
            <div className="repDonutNumber">{total}</div>
            <div className="repDonutSmall">{centerLabel}</div>
          </div>
        </div>

        <div className="repLegend">
          {segments.map((s, idx) => (
            <div key={idx} className="repLegendRow">
              <span className="repDot" style={{ background: s.color }} />
              <div className="repLegendText">
                <div className="repLegendLine1">{s.label}</div>
                <div className="repLegendLine2">
                  {s.note}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function BarsChart({ title, seriesA, seriesB }) {
  // arrays length = 31 days
  const max = Math.max(...seriesA, ...seriesB, 1);

  return (
    <div className="repCard">
      <div className="repCardTitle">{title}</div>

      <div className="repBars">
        {seriesA.map((a, i) => {
          const b = seriesB[i] ?? 0;
          return (
            <div key={i} className="repBarDay">
              <div className="repBarStack">
                <div className="repBar repBarA" style={{ height: `${(a / max) * 100}%` }} />
                <div className="repBar repBarB" style={{ height: `${(b / max) * 100}%` }} />
              </div>
              <div className="repBarLabel">{i + 1}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function LineChart({ title, seriesA, seriesB }) {
  const max = Math.max(...seriesA, ...seriesB, 1);
  const w = 900;
  const h = 220;
  const pad = 18;

  const toPoints = (arr) =>
    arr
      .map((v, i) => {
        const x = pad + (i / (arr.length - 1)) * (w - pad * 2);
        const y = h - pad - (v / max) * (h - pad * 2);
        return `${x},${y}`;
      })
      .join(" ");

  return (
    <div className="repCard">
      <div className="repCardTitle">{title}</div>

      <div className="repLineWrap">
        <svg viewBox={`0 0 ${w} ${h}`} className="repLineSvg" preserveAspectRatio="none">
          <polyline points={toPoints(seriesA)} fill="none" strokeWidth="3" className="repLineA" />
          <polyline points={toPoints(seriesB)} fill="none" strokeWidth="3" className="repLineB" />
        </svg>

        <div className="repXAxis">
          {Array.from({ length: 31 }).map((_, i) => (
            <span key={i}>{i + 1}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Reporting() {
  // État pour gérer les campagnes
  const [campaigns, setCampaigns] = useState(campaignsRows);
  
  // État pour gérer l'affichage du modal de détails
  const [detailsCampaign, setDetailsCampaign] = useState(null);
  
  // État pour gérer l'affichage du modal de confirmation de suppression
  const [confirmDelete, setConfirmDelete] = useState(null);

  // Fonction pour ouvrir le modal de détails
  const openCampaignDetails = (campaign) => {
    setDetailsCampaign(campaign);
  };

  // Fonction pour fermer le modal de détails
  const closeCampaignDetails = () => {
    setDetailsCampaign(null);
  };
  
  // Fonction pour ouvrir le modal de confirmation de suppression
  const openDeleteConfirm = (campaign) => {
    setConfirmDelete(campaign);
  };
  
  // Fonction pour fermer le modal de confirmation de suppression
  const closeDeleteConfirm = () => {
    setConfirmDelete(null);
  };
  
  // Fonction pour supprimer une campagne
  const deleteCampaign = () => {
    if (confirmDelete) {
      // Filtrer la liste pour supprimer la campagne sélectionnée
      setCampaigns(prev => prev.filter(c => c.id !== confirmDelete.id));
      // Fermer le modal de confirmation
      setConfirmDelete(null);
    }
  };

  // dummy month data (31 days)
  const daysA = [40,120,60,180,90,210,80,160,70,140,60,190,85,220,110,150,95,170,88,200,130,160,120,190,140,210,170,180,160,200,230];
  const daysB = [20,80,40,120,60,140,50,110,45,90,35,130,55,150,70,100,65,120,60,140,80,110,85,135,95,150,120,130,115,145,160];

  const smsA = [60,90,80,110,100,130,120,140,135,150,160,170,165,180,190,200,195,210,220,230,225,240,250,260,255,270,280,290,285,300,320];
  const smsB = [45,70,65,85,78,95,88,105,100,115,120,130,125,140,150,160,155,170,180,190,185,200,210,220,215,230,240,250,245,260,275];

  return (
    <MainLayout pageTitle="Reporting" pageSubtitle="">
      <div className="repPage">
        {/*  Reporting des Campagnes */}
        <div className="repCard">
          <div className="repCardTitle">Reporting Des Campagnes</div>
          <div className="table-responsive">
            <table className="table table-hover mb-0 align-middle repTable">
              <thead className="bg-light">
                <tr>
                  <th className="small">Nom De La Campagne</th>
                  <th className="small">Type De La Campagne</th>
                  <th className="small">Type Du Message De La Campagne</th>
                  <th className="small text-end">Action</th>
                </tr>
              </thead>
              <tbody>
                {campaigns.map((r, idx) => (
                  <tr key={r.id || idx}>
                    <td>{r.name}</td>
                    <td>{r.type}</td>
                    <td>{r.msgType}</td>
                    <td className="text-end" style={{ whiteSpace: "nowrap" }}>
                      <button
                        className="btn-details"
                        onClick={() => openCampaignDetails(r)}
                      >
                        {r.action}
                      </button>
                      <button 
                        className="btn-action ms-2" 
                        title="Supprimer"
                        onClick={() => openDeleteConfirm(r)}
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/*  Reporting des Short Urls */}
        <div className="repCard">
          <div className="repCardTitle">Reporting Des Short Urls</div>
          <div className="table-responsive">
            <table className="table table-hover mb-0 align-middle repTable">
              <thead className="bg-light">
                <tr>
                  <th className="small">URL D'origine</th>
                  <th className="small">URL Court</th>
                  <th className="small">Vue</th>
                  <th className="small">Nom De La Campagne</th>
                  <th className="small">Date De Creation</th>
                </tr>
              </thead>
              <tbody>
                {shortUrlRows.map((r, idx) => (
                  <tr key={idx}>
                    <td className="repEllipsis">{r.url}</td>
                    <td className="repEllipsis">{r.short}</td>
                    <td>{r.vues}</td>
                    <td>{r.campagne}</td>
                    <td>{r.creation}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/*  Donuts row */}
        <div className="repGrid2">
          <Donut
            title="Nombre Des Campagnes Par Statut Pour Le Mois En Cours"
            total="18963"
            centerLabel="Campagnes"
            segments={[
              { label: "Campagne Envoyé", value: 60, color: "#16a34a", note: "60% (0 Campagne)" },
              { label: "Campagnes En Cours", value: 30, color: "#f97316", note: "30% (0 Campagne)" },
              { label: "Campagnes Annulé", value: 10, color: "#ef4444", note: "10% (0 Campagne)" },
            ]}
          />
          <Donut
            title="Nombre SMS Par Statut Pour Le Mois En Cours"
            total="18963"
            centerLabel="SMS"
            segments={[
              { label: "SMS Envoyé", value: 60, color: "#16a34a", note: "60% (0 Campagne)" },
              { label: "SMS En Cours", value: 30, color: "#f97316", note: "30% (0 Campagne)" },
              { label: "SMS Annulé", value: 10, color: "#ef4444", note: "10% (0 Campagne)" },
            ]}
          />
        </div>

        {/*  bar chart */}
        <BarsChart
          title="Nombre Des Campagnes Planifiées/Envoyées Et Echouées Pendant Le Mois En Cours"
          seriesA={daysA}
          seriesB={daysB}
        />

        {/*  line chart */}
        <LineChart
          title="Nombre Des Sms Envoyés Et Echoués Pendant Le Mois En Cours"
          seriesA={smsA}
          seriesB={smsB}
        />

        {/*  Reporting des Utilisateurs */}
        <div className="repCard">
          <div className="repCardTitle">Reporting Des Utilisateurs</div>
          <div className="table-responsive">
            <table className="table table-hover mb-0 align-middle repTable">
              <thead className="bg-light">
                <tr>
                  <th className="small">Prénom</th>
                  <th className="small">Nom</th>
                  <th className="small">Email</th>
                  <th className="small">Numéro Mobile</th>
                  <th className="small">Rôles</th>
                  <th className="small">Campagnes Dont L'utilisateur Est Le Créateur</th>
                </tr>
              </thead>
              <tbody>
                {userRows.map((u, idx) => (
                  <tr key={idx}>
                    <td>{u.prenom}</td>
                    <td>{u.nom}</td>
                    <td>{u.email}</td>
                    <td>{u.mobile}</td>
                    <td>{u.roles}</td>
                    <td>{u.campaigns}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal de détails */}
      {detailsCampaign && (
        <DetailsReportingModal
          campaign={detailsCampaign}
          onClose={closeCampaignDetails}
        />
      )}
      
      {/* Modal de confirmation de suppression */}
      {confirmDelete && (
        <ConfirmModal
          title="Êtes Vous Sûr ?"
          subtitle={`Voulez-vous vraiment supprimer la campagne "${confirmDelete.name}" ? Cette action est irréversible !`}
          onCancel={closeDeleteConfirm}
          onConfirm={deleteCampaign}
        />
      )}
    </MainLayout>
  );
}
