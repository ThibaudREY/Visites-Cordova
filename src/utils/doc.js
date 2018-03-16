import JsPDF from 'jspdf'

export default class {
  static pdf (data, outputType) {
    let conf = JSON.parse(localStorage.getItem('settings'))
    let pdf = new JsPDF('p', 'px', [824, 1168])
    pdf.setFontSize(40)
    pdf.text('Bon de visite immobilier', 270, 94)
    pdf.setFontSize(30)
    pdf.text('Indication de visite d\'un bien immobilier', 100, 160)
    pdf.setFontSize(22)
    pdf.text(`Agence immobilière : ${conf.agency !== undefined ? conf.agency : '.........'}`, 100, 200)
    pdf.text(`Adresse : ${conf.agencyAddress !== undefined ? conf.agencyAddress : '.........'}`, 100, 218)
    pdf.text(`Code postal : ${conf.agencyPostcode !== undefined ? conf.agencyPostcode : '.........'}`, 100, 237)
    pdf.text(`Ville : ${conf.agencyCity !== undefined ? conf.agencyCity : '.........'}`, 100, 256)
    pdf.text(`RCS n° : ${conf.agencyRCS !== undefined ? conf.agencyRCS : '.........'}`, 100, 275)
    pdf.text(`Tél : ${conf.agencyPhone !== undefined ? conf.agencyPhone : '.........'}`, 100, 295)
    pdf.text(`Titulaire de la carte profesionnelle n° ${conf.agencyProCard !== undefined ? conf.agencyProCard : '.........'} délivrée par la préfecture`, 100, 314)
    pdf.text(`de ${conf.agencyProCardPref} portant sur la « ${conf.agencyProCardLabel !== undefined ? conf.agencyProCardLabel : '.........'} »`, 100, 333)
    pdf.text(`Bénéficiant de la garantie d'un montant de ${conf.agencyCapital !== undefined ? conf.agencyCapital : '.........'} € délivrée par ${conf.agencyCapitalOwner !== undefined ? conf.agencyCapitalOwner : '.........'}`, 100, 352)
    pdf.line(100, 380, 700, 380)
    pdf.text(`Je soussigné (e) Me-M. ${data.client.first_name !== undefined ? data.client.first_name : '.........'} ${data.client.last_name !== undefined ? data.client.last_name : '.........'}`, 100, 410)
    pdf.text(`Demeurant à ${data.client.address !== undefined ? data.client.address : '.........'}`, 100, 429)
    pdf.text(`et agissant pour son nom personnel, reconnait :`, 100, 448)
    pdf.text('•', 100, 486)
    pdf.text(`M'être rendu à l'agence ${conf.agency !== undefined ? conf.agency : '.........'} et avoir reçu pour la première fois les`, 124, 486)
    pdf.text(`renseignements, adresse et prix de vente FAI concernant le bien désigné ci-dessous.`, 124, 504)
    pdf.text('•', 100, 525)
    pdf.text(`Avoir visité par l'entremise de l'agence immobilière le bien immobilier dont les`, 124, 525)
    pdf.text(`caractéristiques suivent :`, 124, 542)
    pdf.text(`Type de bien : ${'.........'}`, 100, 600)
    pdf.text(`Adresse : ${data.adresse !== undefined ? data.adresse : '.........'}`, 100, 620)
    pdf.text(`En date du ${data.date_visite !== undefined ? data.date_visite : '........'/* Date de now si vu depuis Edit */} à ${'.......'} Heures`, 100, 659)
    pdf.text(`Par l'intermédiaire de Me-M ${data.agent.first_name} ${data.agent.last_name}`, 100, 677)
    pdf.line(100, 702, 700, 702)
    pdf.setFontSize(16)
    pdf.text(`Je m'engage sur l'honneur à ne pas tenter de traiter directement ou indirectement`, 100, 729)
    pdf.text(`l'achat dudit bien avec les vendeurs pendant 24 mois à compter de ce jour. Dans le`, 100, 748)
    pdf.text(`cas contraire, je m'engage à réglerà l'agence le montant de honoraires prévus`, 100, 767)
    pdf.text(`dans le mandat (ou 10% du montant de la valeur du bien).`, 100, 786)
    pdf.text(`Je sais en outre que ces informations sont confidentielles et je m'interdis de les`, 100, 825)
    pdf.text(`divulguer à quiconque. Dans le cas où une autre agence me proposerait le bien, je`, 100, 844)
    pdf.text(`m'engage à l'informer de la visite effectuée avec ${conf.agency}.`, 100, 863)
    pdf.text(`Ce bon de visite est établi pour valoir ce que de droit.`, 100, 920)
    pdf.text(`A ${'.........'} le ${'.........'}.`, 100, 958)
    pdf.text(`Le client,`, 100, 996)
    pdf.text(`Lu et approuvé,`, 100, 1016)
    pdf.text(`L'agent immobilier`, 542, 996)
    // TODO: signatures
    switch (outputType) {
      case 'base64':
        return pdf.output('datauristring')
      case 'blob':
        return pdf.output('blob')
      case 'print':
        return pdf.autoPrint()
    }
  }
}
