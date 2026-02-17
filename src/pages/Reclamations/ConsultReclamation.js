// import { Button } from "primereact/button";
// import { Toast } from "primereact/toast";
// import { useTranslation } from "react-i18next";
// import { DataTable } from "primereact/datatable";
// import { Column } from "primereact/column";
// import { useRef, useState } from "react";
// import { useNavigate } from "react-router-dom";

// const ConsultReclamation = () => {

//     const toast = useRef(null);
//     const { t } = useTranslation();
//     const navigate = useNavigate();

//     const [reclamations, setReclamations] = useState([]);
//     const [selecteReclamation, setSelectedReclamation] = useState(null);
//     // const reclamationService = new ReclamationService();
//     const [filters1, setFilters1] = useState("");
//     // useEffect(() => {
//     //     setFilters1({
//     //         Creator: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
//     //     });
//     //     reclamationService.getReclamations(user.entity.entityName).then(response => {
//     //         if (!ERROR_CODES.includes(response?.status) && response.issues.length > 0) {
//     //             setReclamations(response.issues);
//     //         }
//     //         else if (ERROR_CODES.includes(response?.status)) {
//     //             toast.current.show({ severity: 'error', summary: 'Error', detail: t('problm_tech'), life: 3000 });
//     //         }
//     //     });
//     // }, []);

//     const entityName = (rowData) => {
//         return (
//             <>{rowData?.fields?.customfield_10608}</>
//         );
//     }
//     const createDate = (rowData) => {
//         return (
//             <>{rowData?.fields.created}</>
//         );
//     }
//     const currentStatus = (rowData) => {
//         return (
//             <>{rowData?.fields?.customfield_10010?.currentStatus?.status}</>
//         );
//     }
//     const project = (rowData) => {
//         return (
//             <>{rowData?.fields?.customfield_10345?.value}</>
//         );
//     }
//     const creater = (rowData) => {
//         return (
//             <>{rowData?.fields?.customfield_10344}</>
//         );
//     }
//     const key = (rowData) => {
//         return (
//             <>{rowData?.key}</>
//         );
//     }
//     const Description = (rowData) => {
//         return (
//             <>{rowData?.fields?.customfield_10346?.value}</>
//         );
//     }
//     const addReclamation = () => {
//         const pathname = `/reclamation/addReclamation`;
//         navigate(pathname)
//     }

//     return (
//         <>
//             <div className="title-component">
//                 <h2>{/*t('Reclamation')*/}</h2>
//                 <Button className="activationButton" onClick={addReclamation}>
//                     <i className="icon-plus" />
//                     {t("add-reclamation")}
//                 </Button>
//             </div>
//             <div className="card" >
//                 <Toast ref={toast} />

//                 <h2 >{t('title_List_Reclamation')}</h2>

//                 <DataTable
//                     paginator
//                     value={reclamations}
//                     onSelectionChange={(e) => setSelectedReclamation(e.value)}
//                     rows={10}
//                     className="p-datatable-gridlines"
//                     rowsPerPageOptions={[10, 20, 50]}
//                     paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
//                     currentPageReportTemplate="afficher {first} à {last} de {totalRecords} reclamation"
//                     emptyMessage={t("EMPTY_MESSAGE")}
//                     responsiveLayout="scroll"
//                     let-i="rowIndex"
//                 >
//                     <Column
//                         field="key"
//                         header={t('key')}
//                         body={key}
//                     />
//                     <Column
//                         field="Description"
//                         header={t('DESCRIPTION')}
//                         body={Description}
//                     />
//                     <Column
//                         field="Boutique"
//                         header={t('boutique')}
//                         filterPlaceholder={t("search_code_contrat")}
//                         body={entityName}
//                     />
//                     <Column
//                         field="CreationDate"
//                         header={t('CreationDate')}
//                         body={createDate}
//                     />
//                     <Column
//                         field="STATUS"
//                         header={t("STATUS")}
//                         body={currentStatus}
//                     />
//                     <Column
//                         field="Project"
//                         header={t("Project")}
//                         body={project}
//                     />

//                     <Column
//                         field="Creator"
//                         header={t("Creator")}
//                         body={creater}
//                         filter
//                         filterField="fields.customfield_10344"
//                         filterPlaceholder="Rechercher créateur"
//                         filterMatchMode="contains"
//                     />
//                 </DataTable>



//             </div></>
//     );
// }

// export default ConsultReclamation