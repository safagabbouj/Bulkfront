// import React, { useRef } from "react";
// import { Button } from "primereact/button";
// import { Toast } from "primereact/toast";
// import { Dropdown } from "primereact/dropdown";
// import { useTranslation } from 'react-i18next';

// const Reclamation = () => {
//   const toast = useRef(null);
//   const { t } = useTranslation();
//   const styles = {
//     headerStyle: { width: "14%", minWidth: "20rem", },
//     buttonStyle: {
//       backgroundColor: "#647b5e", cursor: "pointer",
//     },
//     cardstyle: { width: '80%', marginLeft: '10%' },
//     formStyle: { width: '80%' },
//     styleloading: { fontSize: '2rem' },
//     styletable: {
//       marginLeft: '116px',
//       marginRight: '150px'
//     },
//     styleMer: { marginLeft: '5%' },
//     divbutton: { marginTop: '3%', marginLeft: '5%' },
//     RequiredStyle: { color: 'red', fontWeight: 'bold' },
//     labelStyle: { color: 'black', fontWeight: 'bold' }

//   };
//   return (
//     <div >
//       <Toast ref={toast} />
//       <div style={{ width: '100%' }}>
//         <h2 className="mb-2">{t("add-reclamation")}</h2>
//         <br />
//         <div className="card" style={{
//           padding: "4%",
//           justifyItems: 'normal'
//         }}>
//           <div className='field grid'>
//             <div className="col-12 md:col-6 lg:col-3">
//               <label style={styles.labelStyle}>{t('type_reclamation')}</label>
//               <label style={styles.RequiredStyle}>*</label>:
//             </div>
//             <div className="col-12 md:col-9">
//               <Dropdown
//                 id="typeReclamation"

//                 required
//                 className="form-control"
//                 style={{ width: '50%', fontSize: '16px', borderColor: 'rgba(220, 220, 220)' }}
//               />
//             </div>
//           </div>

//           <div className='field grid'>
//             <div className="col-12 md:col-6 lg:col-3">
//               <label style={styles.labelStyle}>{t('level')}</label>
//               <label style={styles.RequiredStyle}>*</label>:
//             </div>
//             <div className="col-12 md:col-9">
//               <Dropdown
//                 id="typeReclamation"

//                 required
//                 className="form-control"
//                 style={{ width: '50%', fontSize: '16px', borderColor: 'rgba(220, 220, 220)' }}
//               />
//             </div>
//           </div>


//           <div className='field grid'>
//             <div className="col-12 md:col-6 lg:col-3">
//               <label style={styles.labelStyle}>{t('DESCRIPTION')}</label>
//               <label style={styles.RequiredStyle}>*</label>:
//             </div>
//             <div className="col-12 md:col-9">
//               <textarea
//                 id="description"
//                 rows={6}
//                 className="form-control"
//                 required
//                 style={{
//                   width: '50%', fontSize: '16px', border: '1.07px solid', borderRadius: '16.04px',

//                   borderColor: 'rgba(220, 220, 220)'

//                 }}
//               />
//             </div>
//           </div>




//           <div style={{ marginTop: '20px' }}>
//             <Button
//               label={t("soumettre")}
//               icon="pi pi-send"
//               style={{ fontSize: '14px', fontWeight: 'bold', padding: '10px 20px' }}
//             >

//             </Button>
//           </div>
//         </div></div>


//     </div>
//   );
// }
// const comparisonFn = function (prevProps, nextProps) {
//   return prevProps.location.pathname === nextProps.location.pathname;
// };

// export default React.memo(Reclamation, comparisonFn);

const Reclamation = () => {
  return (
    <div>Reclamation</div>
  )
}

export default Reclamation
