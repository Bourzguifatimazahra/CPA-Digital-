// [IA désactivée] Fichier de l'assistant intelligent mis entièrement en commentaire.
// Pour le réactiver : retirer les « // » en début de ligne (et la ligne « export {} » ci-dessous).
export {};
// // Base de connaissances du chatbot CPA (assistant Gemini).
// // Sources : "Catalogue des Branches d'Assurance" (PDF) et "chatbot.docx" (questions / réponses).
// // Questions sans réponse ou contradictoires retirées volontairement : le bot renvoie vers un conseiller CPA.
// // ATTENTION : ce contenu est livré dans le JavaScript public du site — n'y mettez rien de confidentiel.
//
// export const CPA_KNOWLEDGE = `
// ## CPA — Informations sur le cabinet
// - Nom : CPA (Conseil et Placement d'Assurances), cabinet de courtage en assurances.
// - Depuis 1957, basé à Casablanca (Maroc). Accompagne les particuliers et les entreprises.
// - Téléphone / WhatsApp : 0667558436 — Email : info@cpa.ma — Site : https://cpa.ma
// - Horaires : du lundi au vendredi, de 8h30 à 18h00.
// - Valeurs : proximité, innovation, performance, éthique.
// - Compagnies partenaires : Allianz, AXA, Wafa Assurance, RMA, Sanlam, AtlantaSanad, La Marocaine Vie, et d'autres.
// - Produits particuliers : Auto, Habitation, Santé, Prévoyance, Épargne, Trottinette électrique, Animaux de compagnie.
// - Produits entreprises : Responsabilité Civile, Accidents de Travail, Flotte Auto (contrats flotte à partir de 5 véhicules), Construction, Transport / Maritime, Cyber Risques, Multirisques, Santé groupe.
// - Devis : gratuit et sans engagement, par téléphone, email, WhatsApp ou le formulaire de contact du site.
// - Le conseil du courtier est gratuit pour le client : sa rémunération est incluse dans la prime.
//
// ## Catalogue des branches d'assurance
//
// ### Assurance Automobile
// - La garantie de base « responsabilité civile automobile » a pour but de couvrir, selon les conditions du contrat, la responsabilité civile de l’assuré en cas de dommages corporels ou matériels causés à des tiers (personnes ou biens) lors d’un accident, incendie ou explosion impliquant le véhicule assuré. Cette garantie, obligatoire par la loi, ne prend pas en charge les dommages subis par l’assuré ni ceux affectant son véhicule.
// - Les garanties annexes, optionnelles, offrent une protection complémentaire. Elles couvrent notamment :
// - Les dommages matériels du véhicule assuré (collision, accidents, incendie, vol, bris de glace, etc.).
// - Les dommages corporels du conducteur et des passagers (prise en charge des frais médicaux et d’hospitalisation, indemnisation en cas de décès ou d’invalidité).
// - L’accompagnement juridique pour défendre les intérêts de l’assuré ou exercer un recours en son nom (« garantie défense et recours »).
//
// ### Assurance Santé
// - C’est une couverture collective mise en place par un employeur pour protéger ses salariés contre les dépenses de santé. Elle permet de rembourser tout ou partie des frais médicaux engagés par les employés, tels que les consultations, les médicaments, les soins hospitaliers et les actes spécialisés. Cette assurance fait partie des avantages sociaux offerts aux salariés et contribue à leur bien-être en facilitant l’accès aux soins. Elle fonctionne sur la base d’un contrat collectif, financé en partie par l’entreprise et, selon les modalités, par une contribution des employés. En plus de répondre aux obligations légales dans certains pays, elle renforce l’attractivité de l’entreprise, améliore la fidélisation des employés et participe à leur motivation en leur garantissant une meilleure protection en cas de problème de santé. Elle peut également inclure des services complémentaires.
//
// ### Assurance Accidents de Travail
// - L’assurance accidents de travail (AT) couvre les employés contre les risques liés à leur activité professionnelle. Elle peut être classée en plusieurs types selon l’étendue de la couverture et les bénéficiaires.
// - 1. Assurance Accidents de Travail Obligatoire Imposée par la loi dans de nombreux pays : Couvre les salariés en cas d’accident survenu pendant le travail ou sur le trajet domicile-travail. Garantit la prise en charge des frais médicaux, des indemnités journalières en cas d’incapacité temporaire, des rentes en cas d’invalidité et d’une indemnisation aux ayants droit en cas de décès.
// - 2. Assurance Accidents de Travail pour les Travailleurs Indépendants : Destinée aux auto- entrepreneurs, artisans et professions libérales: Permet de bénéficier d’une indemnisation en cas d’accident survenu dans le cadre professionnel .Souvent facultative, mais fortement recommandée pour éviter une perte de revenu en cas d’incapacité de travail.
// - 3. Assurance Accidents de Travail pour les Travailleurs Temporaires ou Saisonniers Conçue pour couvrir les employés en contrat temporaire, saisonnier ou intérimaire. Peut être souscrite par l’employeur ou via un régime spécifique selon la réglementation du pays.
//
// ### Assurance Responsabilité Civile
// - 1. Responsabilité Civile Générale
// - Elle couvre les dommages corporels, matériels et immatériels causés involontairement à des tiers par l’assuré, ses proches ou ses biens. Cette garantie s’applique aussi bien aux particuliers qu’aux professionnels.
// - 2. Responsabilité Civile Professionnelle (RC Pro)
// - Obligatoire pour certaines professions (médecins, avocats, experts-comptables, architectes…), elle protège contre les fautes, erreurs ou omissions commises dans le cadre de l’exercice professionnel et pouvant causer un préjudice à un client ou un tiers.
// - 3. Responsabilité Civile Exploitation
// - Elle couvre les dommages causés à des tiers dans le cadre de l’activité quotidienne d’une entreprise, en dehors des prestations fournies (exemple : un client qui glisse dans les locaux d’une entreprise).
// - 4. Responsabilité Civile Produits
// - Cette garantie concerne les fabricants, distributeurs et commerçants. Elle couvre les dommages causés par un produit défectueux après sa mise sur le marché.
// - 5. Responsabilité Civile Environnementale
// - Elle s’applique aux entreprises et industries pouvant causer des dommages à l’environnement (pollution des sols, contamination de l’eau, nuisances sonores…).
//
// ### Assurance Multirisques
// - 1. Assurance Multirisque Habitation (MRH)
// - Elle protège les logements des particuliers contre divers sinistres (incendie, vol, dégât des eaux, événements climatiques…) et inclut la responsabilité civile du souscripteur et de sa famille.
// - 2. Assurance Multirisque Professionnelle (MRP)
// - Destinée aux entreprises et aux professionnels, elle couvre les locaux, le matériel, la responsabilité civile de l’entreprise, ainsi que les pertes d’exploitation en cas de sinistre.
// - 3. Assurance Multirisque Industrielle
// - Adaptée aux grandes entreprises et aux industries, elle englobe la protection des bâtiments, des machines, des stocks et des responsabilités liées à l’activité industrielle.
// - 4. Assurance Multirisque Commerçant et Artisans
// - Elle protège les locaux, les équipements, les stocks et la responsabilité civile du commerçant ou de l’artisan face aux dommages causés aux clients, fournisseurs ou employés.
// - 5. Assurance Multirisque Informatique
// - Spécifique aux entreprises du numérique, elle couvre les équipements informatiques, les cyber-risques (piratage, perte de données) et les responsabilités associées.
// - 6. Assurance Multirisque Hôtellerie et Restauration
// - Conçue pour les hôtels et restaurants, elle protège les établissements contre les incendies, vols, dégâts des eaux, ainsi que la responsabilité civile liée à l’accueil des clients.
//
// ### Assurance Transport
// - Couvre les marchandises et les véhicules en cas de vol, perte ou avarie durant le transport. Elle s’applique aux transporteurs, aux entreprises import/export et aux particuliers.
//
// ### Assurance Construction
// - Cette assurance couvre les dommages pouvant affecter l’ouvrage en cours de construction, ainsi que les matériaux et équipements destinés à y être intégrés pendant toute la durée du chantier.
// - Elle protège également la responsabilité du maître d’ouvrage et des différents intervenants contre les dommages causés aux tiers du fait ou à l’occasion des travaux réalisés sur le chantier.
//
// ### La Responsabilité Civile Décennale
// - Elle vise à garantir la responsabilité civile décennale de l’assuré (architecte, ingénieur ou entrepreneur). Cette assurance couvre les conséquences d’un écroulement ou d’un risque d’écroulement de l’ouvrage survenant dans les dix ans suivant sa réception.
//
// ### Assurance Cyber Risques
// - La cyber sécurité est un enjeu majeur à l’heure du digital. Protéger les données numériques, et qui sont des menaces provenant d’une erreur humaine. Par cela, l’hameçonnage est le risque cyber le plus courant dont la plupart des personnes tombent dans le piège. L’hameçonnage est un mail ou un SMS frauduleux fait pour voler vos informations confidentielles et pirater votre système informatique
//
// ### Assurance Maritime et Aérienne
// - C’est une branche de l’assurance qui couvre les risques liés au transport maritime et aérien. Elle protège les propriétaires de navires et d’aéronefs, les transporteurs, les affréteurs, ainsi que les expéditeurs de marchandises contre les pertes, dommages ou responsabilités pouvant survenir lors du transport de biens et de passagers. Elle englobe plusieurs types de couvertures, incluant la protection des véhicules (navires, avions), des cargaisons, des équipages et des tiers affectés par les opérations de transport. Son objectif principal est de sécuriser les échanges commerciaux internationaux et de garantir une compensation financière en cas de sinistre.
//
// ## Questions / réponses validées par CPA
//
// Le contrat d’assurance
// Questions possibles du client :
// Qu’est-ce qu’un contrat d’assurance exactement ? Un contrat d’assurance est un accord entre vous et l’assureur pour vous protéger contre certains risques en échange d’une prime.
// Qui sont les parties concernées dans un contrat d’assurance ? Les parties concernées dans un contrat d’assurance sont : l’assureur, le souscripteur, et l’assuré.
// Que signifie “prime d’assurance” ? La prime d’assurance est la somme que vous payez à la compagnie d’assurance pour bénéficier de la couverture prévue dans votre contrat.
// Quelle est la différence entre le souscripteur et l’assuré ? Le souscripteur signe le contrat et paie la prime, tandis que l’assuré est la personne ou le bien protégé par ce contrat.
// Quels sont les documents qui composent un contrat d’assurance ? Un contrat d’assurance est composé principalement des conditions générales, des conditions particulières, et des avenants.
// Quelle est la durée d’un contrat d’assurance ?  La durée d’un contrat d’assurance est généralement d’un an, avec une reconduction automatique à chaque échéance sauf en cas de résiliation.
// Comment puis-je résilier mon contrat ? Vous pouvez résilier votre contrat par lettre recommandée adressée à l’assureur, généralement 30 jours avant la date d’échéance.
// Quelles sont les conséquences si je ne paie pas ma prime à temps ? Si vous ne payez pas votre prime à temps, votre contrat peut être suspendu, puis résilié après un certain délai si le paiement n’est pas régularisé.
// Que se passe-t-il si mon risque change ou augmente ? Si votre risque change ou augmente, vous devez en informer votre assureur, qui pourra adapter la prime ou les garanties à la nouvelle situation.
// Quels sont mes devoirs en cas de sinistre ? En cas de sinistre, vous devez informer votre assureur rapidement, décrire les circonstances et fournir les justificatifs nécessaires pour l’indemnisation.
// Que veut dire “tacite reconduction” ? La tacite reconduction signifie que votre contrat se renouvelle automatiquement à son échéance, sauf si vous demandez sa résiliation avant la date limite.
// Que signifie “avenant” à un contrat ? Un avenant est un document qui modifie ou complète les clauses de votre contrat d’assurance initial.
// Quelle différence entre les conditions générales et les conditions particulières ?  Les conditions générales précisent les règles communes à tous les contrats, tandis que les conditions particulières indiquent les garanties et informations spécifiques à votre contrat.
// Questions possibles :
// Quelle est la différence entre assurance de choses et assurance de personnes ? L’assurance de choses protège vos biens matériels, tandis que l’assurance de personnes couvre les risques liés à la vie, à la santé ou à l’intégrité physique
// Que veut dire assurance de responsabilité civile ? L’assurance de responsabilité civile couvre les dommages que vous causez à autrui, que ce soit à une personne ou à ses biens.
// C’est quoi le principe indemnitaire ? Le principe indemnitaire signifie que l’assurance vous indemnise uniquement à hauteur du préjudice réellement subi, sans vous faire gagner d’argent.
// Qu’est-ce que la subrogation ? La subrogation signifie que, lorsque l’assureur vous indemnise, il peut ensuite réclamer la même somme au responsable du dommage pour se faire rembourser.
// Quelles sont les principales assurances de personnes (vie, maladie, invalidité…) ? Les principales assurances de personnes sont : l’assurance vie, l’assurance maladie, l’assurance accident et l’assurance invalidité.
// Quelle différence entre assurance vie et contrat de capitalisation ? L’assurance vie protège en cas de décès ou pour épargner à long terme, tandis que le contrat de capitalisation sert uniquement à faire fructifier une épargne sans garantie liée à la vie de l’assuré.
// Que veut dire principe forfaitaire en assurance ? Le principe forfaitaire signifie que l’assureur verse une somme fixe prévue au contrat, sans vérifier le montant réel du dommage subi.
// Peut-on cumuler plusieurs contrats pour le même risque ? Oui, c’est possible, mais en cas de sinistre, l’indemnisation totale ne dépassera pas la valeur réelle du dommage.
// C’est quoi un contrat d’assurance groupe ? Un contrat d’assurance groupe est un contrat souscrit par une entreprise ou une association pour couvrir plusieurs personnes (comme ses employés ou ses membres) selon des conditions communes.
// Les assurances obligatoires
// Quelles sont les assurances obligatoires au Maroc ?  Les assurances obligatoires au Maroc sont principalement : l’assurance automobile (RC auto), l’assurance accidents du travail, et certaines responsabilités civiles professionnelles selon les activités (comme les architectes ou les médecins).
// Quelles professions doivent obligatoirement souscrire une assurance responsabilité civile ? Certaines professions doivent obligatoirement souscrire une assurance responsabilité civile : par exemple les médecins, architectes, avocats, experts-comptables, pharmaciens, et courtiers d’assurance.
// Quelles sanctions si je n’ai pas une assurance obligatoire (auto, AT, etc.) ? Ne pas souscrire une assurance obligatoire peut entraîner de lourdes sanctions, comme une amende, la suspension du permis ou même la saisie du véhicule dans le cas de l’assurance auto.
// La prescription
// Qu’est-ce que la prescription en assurance ? La prescription en assurance est le délai légal au-delà duquel une réclamation n’est plus recevable,
// Quel est le délai pour déclarer un sinistre ? Le délai pour déclarer un sinistre est généralement de 5 jours ouvrables à partir du moment où vous en avez connaissance
// Qu’est-ce qui peut interrompre la prescription ? La prescription peut être interrompue par une assignation en justice, une reconnaissance de dette, ou un courrier recommandé adressé à l’assureur.
// Est-ce que la compagnie peut renoncer à la prescription ? Oui, la compagnie peut y renoncer, mais cette renonciation doit être expresse et écrite dans un document officiel.
// Autres questions générales
// Que faire si j’ai plusieurs assurances pour le même risque ? Si vous avez plusieurs assurances pour le même risque, vous devez en informer chaque assureur, et en cas de sinistre, chacun indemnisera une part proportionnelle sans dépasser le montant du dommage.
// Où payer ma prime ? Vous pouvez payer votre prime directement auprès de votre courtier, agent ou compagnie d’assurance, par virement, chèque ou espèce selon les options proposées.
// Que veut dire “déchéance du contrat” ? La déchéance du contrat signifie que vous perdez votre droit à indemnisation si vous ne respectez pas certaines obligations prévues dans votre contrat.
// Que se passe-t-il si je déclare un sinistre en retard ? Si vous déclarez un sinistre en retard, l’assureur peut réduire ou refuser l’indemnisation, sauf si vous prouvez que le retard est dû à un cas de force majeure.
// Dans quel cas l’assureur peut refuser une indemnisation ? L’assureur peut refuser une indemnisation en cas de fausse déclaration, de non-paiement de la prime, ou si le dommage résulte d’un acte volontaire de l’assuré.
// Compréhension générale de l’assurance
// Qu’est-ce qu’une assurance et à quoi ça sert ? L’assurance est un moyen de protection financière qui vous aide à faire face à des événements imprévus (accident, maladie, vol, incendie…) en vous versant une indemnité ou en prenant en charge les frais selon le contrat.
// Quelle est la différence entre un risque et un sinistre ? Le risque est un événement incertain contre lequel vous vous assurez, tandis que le sinistre est l’événement effectivement survenu qui déclenche l’intervention de l’assurance.
// Pourquoi ai-je besoin d’une assurance ? Vous avez besoin d’une assurance pour vous protéger financièrement contre les accidents, pertes ou dommages imprévus, et éviter d’avoir à supporter seul les coûts.
// Que signifie “prime”, “garantie”, “franchise” ?
// La prime est la somme que vous payez à l’assureur,la garantie est la protection offerte par le contrat,et la franchise est la partie du dommage qui reste à votre charge en cas de sinistre.
// Qu’est-ce qu’un contrat d’assurance multirisque ? Un contrat d’assurance multirisque regroupe plusieurs garanties dans un seul contrat, pour couvrir différents risques comme l’incendie, le vol ou les dégâts des eaux.
// Les intermédiaires d’assurance
// Quelle est la différence entre un courtier et un agent général ? Le courtier représente le client et peut travailler avec plusieurs compagnies, alors que l’agent général représente une seule compagnie d’assurance.
// À quoi sert un intermédiaire d’assurance ? Un intermédiaire d’assurance sert à vous accompagner dans le choix, la souscription et la gestion de vos contrats, tout en vous conseillant la meilleure solution selon vos besoins.
// Est-ce que je paie plus cher en passant par un courtier ? Non, vous ne payez pas plus cher en passant par un courtier.Sa rémunération est incluse dans la prime d’assurance que vous versez à la compagnie, sans coût supplémentaire pour vous.
// Comment savoir si un courtier est agréé ? Pour vérifier si un courtier est agréé, il suffit de consulter la liste officielle publiée par l’ACAPS (Autorité de Contrôle des Assurances et de la Prévoyance Sociale) sur son site web.
// Puis-je changer d’intermédiaire à tout moment ? Oui, vous pouvez changer d’intermédiaire à tout moment, il suffit d’en informer votre assureur par écrit et de désigner le nouvel intermédiaire qui vous représentera.
// Le contrat et ses éléments essentiels
// Qu’est-ce qu’un risque déclaré ?  Un risque déclaré est le risque que vous signalez à votre assureur lors de la souscription, afin qu’il puisse adapter votre contrat et calculer correctement la prime.
// Quels sont mes droits et obligations en tant qu’assuré ?  En tant qu’assuré, vous avez le droit d’être indemnisé selon les garanties prévues et l’obligation de déclarer fidèlement les informations et de payer vos primes à temps.
// Quand le contrat d’assurance prend-il effet ? Le contrat d’assurance prend effet à la date indiquée dans les conditions particulières, souvent après le paiement de la première prime.
// Comment se passe le renouvellement du contrat ?  Le contrat se renouvelle automatiquement chaque année (tacite reconduction), sauf si vous ou l’assureur demandez sa résiliation avant la date d’échéance.
// Gestion du sinistre
// Que faire en cas de sinistre ?  En cas de sinistre, il faut prévenir votre assureur dès que possible, décrire les faits et fournir les documents nécessaires pour permettre l’évaluation et le traitement du dossier.
// Dans quel délai dois-je déclarer un sinistre ?  Vous devez déclarer un sinistre dans un délai de 5 jours ouvrables à partir du moment où vous en prenez connaissance.
// Quels documents dois-je fournir pour une déclaration ? le formulaire de déclaration, une copie du contrat, les justificatifs des dommages (photos, factures, rapports…), un constat ou rapport de police. Selon la nature de sinistre.
// Comment se fait l’expertise après un sinistre ? Après un sinistre, un expert mandaté par l’assureur évalue les dommages subis afin de déterminer le montant de l’indemnisation selon les garanties du contrat.
// Que se passe-t-il si je fais une fausse déclaration ?  Si vous faites une fausse déclaration (omission ou mensonge), l’assureur peut réduire ou refuser l’indemnisation, résilier ou annuler le contrat et garder les primes payées ; en cas de fraude avérée des poursuites civiles et pénales peuvent être engagées.Pour éviter tout risque, déclarez toujours la vérité et informez rapidement votre courtier ou assureur si vous avez fait une erreur.
// Quand vais-je être indemnisé ?  Vous serez indemnisé après la validation du dossier et l’évaluation du sinistre par l’expert, généralement dans un délai de 30 jours suivant l’accord sur le montant.
// Que veut dire “franchise” dans un sinistre ?  La franchise est le montant qui reste à votre charge lors d’un sinistre, même si les dommages sont couverts par l’assurance.
// Relations client / intermédiaire
// Mon courtier peut-il résilier mon contrat ? Non, votre courtier ne peut pas résilier votre contrat, il peut seulement vous conseiller ou transmettre votre demande à la compagnie d’assurance.
// Est-ce que l’assureur peut refuser de renouveler mon contrat ? Oui, l’assureur peut refuser de renouveler votre contrat, mais il doit vous en informer par écrit avant la date d’échéance prévue.
// Comment déposer une réclamation ?  Vous pouvez déposer une réclamation en envoyant un courrier ou un e-mail à votre assureur ou courtier, en précisant le motif et en joignant toutes les pièces justificatives.
// Que faire si je ne suis pas satisfait de mon intermédiaire ? Si vous n’êtes pas satisfait de votre intermédiaire, vous pouvez lui adresser une réclamation écrite, puis, si le problème persiste, saisir l’ACAPS (Autorité de Contrôle des Assurances et de la Prévoyance Sociale).
// Quelles sont les obligations d’information du courtier envers moi ?  Le courtier doit vous informer clairement sur les garanties, exclusions, tarifs et conditions du contrat, et vous conseiller une solution adaptée à vos besoins avant toute souscription.
// Généralités et obligation d’assurance automobile
// Est-ce que l’assurance automobile est obligatoire au Maroc ? Oui, l’assurance automobile est obligatoire au Maroc. Elle couvre la responsabilité civile du conducteur en cas de dommages causés à autrui.
// Quelle est la différence entre assurance obligatoire et facultative ? L’assurance obligatoire est imposée par la loi (comme la RC auto), tandis que l’assurance facultative est optionnelle et sert à renforcer votre protection selon vos besoins
// Que signifie “carte verte” ? La carte verte est le document officiel qui prouve que votre véhicule est assuré et autorisé à circuler, même à l’étranger dans les pays membres du système carte verte.
// Quelles sont les amendes pour non-présentation du document d’assurance ? En cas de non-présentation du document d’assurance, vous risquez une amende, la mise en fourrière du véhicule et la suspension du permis jusqu’à présentation du justificatif.
// Responsabilité civile automobile
// Qu’est-ce que la garantie responsabilité civile (RC) ? La garantie responsabilité civile (RC) couvre les dommages que vous causez à autrui avec votre véhicule, que ce soit des blessures ou des dégâts matériels
// Quelles sont les exclusions de la RC auto ?  Les exclusions de la RC auto concernent notamment les dommages causés volontairement, les courses ou compétitions, les transports de produits dangereux, et les dommages aux biens transportés ou appartenant à l’assuré.
// Est-ce que la RC couvre les passagers ? Oui, la responsabilité civile (RC) couvre les passagers transportés gratuitement dans le véhicule, sauf s’ils sont responsables de l’accident.
// Quelle est la différence entre RC automobile et RC garagiste ? La RC automobile couvre les dommages causés à autrui par un véhicule en circulation.La RC garagiste, elle, couvre les dommages causés par les véhicules confiés à un professionnel (garage, réparateur, concessionnaire) pendant qu’ils sont sous sa garde ou en réparation.
// Qu’est-ce que la déchéance de garantie ? La déchéance de garantie signifie que l’assureur refuse de prendre en charge un sinistre parce que l’assuré n’a pas respecté les obligations du contrat (par exemple, déclaration tardive ou fausse déclaration).
// Prime d’assurance et CRM
// Comment est calculée la prime d’assurance automobile ? La prime d’assurance automobile est calculée selon plusieurs critères : le type de véhicule, son usage, la puissance fiscale, le profil du conducteur, et son historique de sinistres (bonus-malus).
// Qu’est-ce que le CRM (coefficient de réduction et de majoration) ? Le CRM est un système de bonus-malus : il réduit votre prime si vous n’avez pas eu d’accident, ou la majore si vous êtes responsable d’un sinistre.
// Est-ce que ma prime augmente après un accident ? Oui, votre prime peut augmenter après un accident responsable, car cela entraîne une majoration de votre coefficient CRM.
// Comment bénéficier d’une réduction de prime ? Vous pouvez bénéficier d’une réduction de prime (bonus) en conduisant prudemment et en n’ayant aucun accident responsable pendant une période donnée.
// Comment réviser ma prime lors du renouvellement ? Vous pouvez réviser votre prime lors du renouvellement en négociant les garanties avec votre assureur pour ajuster le tarif.
// Résiliation et transfert
// Comment puis-je résilier mon contrat auto ? Vous pouvez résilier votre contrat auto en envoyant une lettre recommandée à votre assureur au moins 30 jours avant la date d’échéance, ou dans certains cas particuliers (vente du véhicule, changement de domicile, ou augmentation injustifiée de prime).
// Que se passe-t-il si je vends mon véhicule ? Si vous vendez votre véhicule, le contrat d’assurance est suspendu automatiquement dès la vente et peut être résilié sur simple demande à votre assureur avec une preuve de cession.
// Est-ce que mon assurance est transférable sur un autre véhicule ? oui, votre assurance peut être transférée sur un autre véhicule, à condition d’en informer votre assureur pour qu’il mette à jour le contrat selon les caractéristiques du nouveau véhicule.
// Garanties facultatives
// Quelles sont les garanties facultatives disponibles ? vol, incendie, bris de glaces, dommages collision, tous accidents, protection du conducteur, catastrophes naturelles (EVCAT) et perte financière.
// Qu’est-ce que la garantie “vol” couvre exactement ? La garantie vol couvre la disparition totale du véhicule ou les dommages causés lors d’une tentative de vol, comme une effraction ou un bris de serrure.
// La garantie incendie couvre-t-elle les objets dans le véhicule ? Non, la garantie incendie couvre uniquement les dommages causés au véhicule lui-même, pas aux objets ou effets personnels à l’intérieur.
// Quelle est la différence entre “dommages collisions” et “dommages tous accidents” ? La garantie dommages collisions couvre uniquement les accidents impliquant un tiers identifié, tandis que la garantie tous accidents couvre tous les dommages au véhicule, même sans tiers ou en cas de faute du conducteur.
// Qu’est-ce que la garantie “bris de glaces” ? La garantie bris de glaces couvre les fissures ou cassures des éléments vitrés du véhicule, comme le pare-brise, les vitres latérales, la lunette arrière, et parfois les rétroviseurs selon le contrat.
// Que veut dire “protection du conducteur” et “protection des passagers” ?  La protection du conducteur couvre les blessures ou le décès du conducteur lors d’un accident, même s’il est responsable.La protection des passagers, elle, couvre les personnes transportées gratuitement dans le véhicule en cas d’accident.
// Qu’est-ce que la garantie “perte financière” ? La garantie perte financière couvre la différence entre la valeur à neuf du véhicule et le montant remboursé par l’assurance en cas de vol ou de destruction totale du véhicule financé par crédit ou leasing.
// Est-ce que mon assurance couvre les inondations ? Oui, si votre contrat inclut la garantie EVCAT (Événements Catastrophiques), votre assurance couvre les dommages causés par les inondations, tremblements de terre ou tempêtes.
// Que signifie “rachat de vétusté” ? Le rachat de vétusté est une option qui permet d’être indemnisé sans déduction liée à l’usure du véhicule, en recevant une valeur plus proche du neuf.
// Qu’est-ce que la garantie “EVE CAT” (Événements catastrophiques) ? La garantie EVE CAT couvre les dommages causés par des événements naturels exceptionnels comme les inondations, tremblements de terre, tempêtes ou actes de terrorisme reconnus par les autorités.
// Gestion des sinistres matériels
// Que dois-je faire en cas d’accident ? En cas d’accident, protégez la zone, remplissez un constat à l’amiable (ou appelez la police si nécessaire), puis informez votre assureur dans les 5 jours avec tous les détails de l’incident.
// Quels sont les délais pour déclarer un sinistre ? Vous devez déclarer un sinistre dans les 5 jours ouvrables à compter du moment où vous en avez connaissance, sauf cas de force majeure.
// Que faire si je suis responsable ? Et si je ne le suis pas ? Si vous êtes responsable, votre assurance RC couvre les dommages causés à autrui, mais pas ceux de votre véhicule sauf si vous avez une garantie dommages.Si vous n’êtes pas responsable, c’est l’assurance du tiers fautif qui prend en charge vos réparations.
// Qu’est-ce qu’un constat à l’amiable ? Un constat à l’amiable est un document rempli par les conducteurs après un accident, qui décrit les circonstances de l’événement pour faciliter le règlement du sinistre par les assureurs.
// Quelle est la procédure d’expertise en cas de sinistre ? Après un sinistre, un expert mandaté par l’assureur examine le véhicule pour évaluer les dommages, déterminer les réparations nécessaires et estimer le montant de l’indemnisation.
// Qu’est-ce que la “Convention d’indemnisation directe (CID)” ? La Convention d’Indemnisation Directe (CID) permet à votre propre assureur de vous indemniser directement en cas d’accident sans blessés, même si vous n’êtes pas responsable, ce qui accélère le règlement du sinistre.
// Quelles sont les étapes d’une indemnisation ?
// Les étapes d’une indemnisation sont :
// 1 - Déclaration du sinistre à l’assureur,2- Expertise et évaluation des dommages,3- Accord sur le montant de l’indemnité,4- Versement du règlement selon les conditions du contrat.
// Quelles sont les exclusions lors de la gestion de sinistres ? Les principales exclusions concernent les dommages causés volontairement, les courses ou compétitions, la conduite sans permis ou sous l’emprise de l’alcool, et les cas de fausse déclaration.
// Gestion des sinistres corporels
// Comment suis-je indemnisé en cas de blessure ? En cas de blessure, vous êtes indemnisé selon le degré d’incapacité fixé par un médecin expert, couvrant les frais médicaux, la perte de revenus et éventuellement un capital pour les séquelles permanentes.
// Quels sont les frais remboursés (hospitalisation, médicaments…) ? L’assurance rembourse généralement les frais médicaux, chirurgicaux, d’hospitalisation, de pharmacie et de rééducation, dans la limite des plafonds prévus au contrat.
// Que se passe-t-il en cas de décès du conducteur ou passager ? En cas de décès du conducteur ou d’un passager, une indemnité est versée aux ayants droit (conjoint, enfants, parents) selon les garanties prévues au contrat ou le barème légal du Dahir de 1984.
// Quels sont les droits des ayants droit ? Les ayants droit (conjoint, enfants, parents) ont droit à une indemnité ou une rente pour compenser la perte financière et morale causée par le décès de la victime.
// Que signifie “préjudice d’affection” ? Le préjudice d’affection correspond à la souffrance morale ressentie par les proches à la suite du décès ou de la blessure grave d’un être cher.
// Cas particuliers
// Que couvre l’assurance “frontière” pour les véhicules étrangers ? L’assurance frontière couvre la responsabilité civile des véhicules étrangers qui entrent temporairement au Maroc, afin de garantir les dommages causés à des tiers en cas d’accident.
// Les véhicules garagistes doivent-ils avoir une RC spéciale ? Oui, les garagistes et professionnels de l’automobile doivent souscrire une RC spéciale dite “RC Garagiste”, qui couvre les véhicules confiés par les clients pendant les essais ou réparations.
// Est-ce que les dommages lors de compétitions ou rallyes sont couverts ? Non, les dommages survenus lors de compétitions, rallyes ou épreuves de vitesse ne sont pas couverts,
// L’assurance couvre-t-elle les véhicules loués ? Oui, les véhicules loués sont couverts, mais il faut que le contrat de location mentionne l’assurance.
// Cadre juridique et obligation d’assurance
// Qu’est-ce qu’une assurance Accidents du Travail (AT) ? L’assurance Accidents du Travail (AT) couvre les dommages corporels subis par un salarié pendant son travail ou sur le trajet entre son domicile et son lieu de travail.
// Est-ce une assurance obligatoire pour toutes les entreprises ? Oui, l’assurance Accidents du Travail est obligatoire pour toutes les entreprises ayant des salariés, afin de garantir leur protection en cas d’accident lié au travail.
// Quelle est la différence entre accident du travail, de trajet et maladie professionnelle ?
// Un accident du travail survient pendant l’exécution du travail,un accident de trajet se produit entre le domicile et le lieu de travail,et une maladie professionnelle résulte d’une exposition prolongée à un risque lié à l’activité professionnelle.
// L’assurance couvre-t-elle les employés non déclarés à la CNSS ? Oui, l’assurance peut couvrir les employés non déclarés à la CNSS, à condition qu’ils soient explicitement mentionnés dans la police d’assurance.
// Que risque un employeur non assuré ? Un employeur non assuré risque de devoir payer personnellement toutes les indemnités dues à la victime ou à ses ayants droit en cas d’accident du travail.
// Définition et conditions de réparation
// Qu’est-ce qu’un accident du travail selon la loi ? Selon la loi marocaine sur les accidents du travail, un accident du travail est défini comme tout événement soudain et imprévu, survenu par le fait ou à l’occasion du travail, causant une lésion corporelle à un salarié et entraînant une incapacité ou un décès .
// Qu’est-ce qu’un accident de trajet ? Un accident de trajet est un accident survenu entre la résidence du salarié et son lieu de travail, à l’aller ou au retour, sur le trajet habituel et sans interruption injustifiée
// Quelles sont les conditions pour bénéficier d’une indemnisation ?  Pour bénéficier d’une indemnisation, il faut que l’accident ou la maladie soit reconnu comme professionnel, que le salarié soit déclaré à l’assureur dans les délais, et que les pièces justificatives (certificat médical, déclaration, rapport) soient fournies
// Qu’est-ce qu’une “lésion imputable au travail” ? Une lésion imputable au travail est une blessure ou atteinte physique qui résulte directement d’un accident survenu pendant ou à cause du travail
// Qu’est-ce que la faute intentionnelle et la faute inexcusable ? La faute intentionnelle est une action volontaire visant à causer un dommage.La faute inexcusable est une négligence grave de l’employeur qui avait conscience du danger mais n’a pas pris les mesures nécessaires pour protéger le salarié
// Le salarié est-il couvert s’il est responsable de l’accident ? Oui, le salarié reste couvert même s’il est responsable de l’accident, sauf en cas de faute intentionnelle de sa part
// Prime et souscription
// Comment est calculée la prime AT ? La prime AT est calculée en fonction de la masse salariale de l’entreprise, de la nature de l’activité (niveau de risque) et du taux fixé par la compagnie d’assurance pour chaque catégorie professionnelle
// Comment déclarer la masse salariale ? La masse salariale doit être déclarée à l’assureur par l’employeur lors de la souscription et à chaque renouvellement du contrat Accidents du Travail (AT).Elle correspond au total des salaires bruts annuels versés aux employés.
// Que veut dire “régularisation de prime” ? La régularisation de prime consiste à ajuster le montant de la prime d’assurance en fin d’année en fonction de la masse salariale réelle déclarée, pour corriger la différence avec la prime provisoire versée au début du contrat
// Quelles sont les sanctions si les salaires ne sont pas correctement déclarés ? Si les salaires ne sont pas correctement déclarés, l’employeur risque une majoration de prime, une réévaluation rétroactive du contrat, voire un refus d’indemnisation partielle en cas de sinistre, selon la gravité de l’omission
// Sinistres et indemnisation
// Quels documents faut-il fournir pour la déclaration d’un accident ? : Pour déclarer un accident du travail, il faut fournir :la déclaration d’accident signée par l’employeur, le certificat médical initial, la copie du registre de paie ou du contrat de travail et, en cas de décès, l’acte de décès et les pièces des ayants droit
// En cas de décès du salarié
// Qui bénéficie de la rente en cas de décès d’un salarié ? En cas de décès d’un salarié, la rente est versée au conjoint survivant, aux enfants à charge et, dans certains cas, aux parents selon les dispositions légales.
// Quelle rente est versée au conjoint survivant ?  En cas de décès du salarié, le conjoint survivant reçoit une rente équivalente à 50 % du salaire de référence de la victime, conformément aux dispositions de la loi sur les accidents du travail.
// Que signifie “réduction proportionnelle des rentes” ? La réduction proportionnelle des rentes signifie que si le total des rentes dépasse le maximum prévu par la loi, chaque bénéficiaire reçoit une part ajustée proportionnellement.
// Délais et prescription
// Gestion des sinistres
// Quelles sont les étapes de la procédure d’indemnisation ? Les étapes de l’indemnisation sont : déclaration du sinistre, évaluation des dommages par l’expert, puis versement de l’indemnité selon les garanties prévues au contrat.
// Qu’est-ce qu’un PV de conciliation ? Un PV de conciliation est un document officiel qui constate un accord entre la victime et l’assureur sur le montant de l’indemnisation après un accident du travail.
// Quand la compagnie doit-elle payer après la transaction ? La compagnie doit verser le paiement dans les 30 jours suivant la signature du procès-verbal de transaction par la victime ou ses ayants droit.
// Quelle est la différence entre un dossier de sinistre avec décès et sans décès ? Un dossier de sinistre avec décès concerne les ayants droit de la victime (conjoint, enfants, parents) et nécessite des pièces supplémentaires comme l’acte de décès et les justificatifs familiaux.Un dossier sans décès concerne directement la victime blessée et se limite aux documents médicaux et de déclaration d’accident.
// Que faire en cas de désaccord sur le taux d’invalidité ? En cas de désaccord sur le taux d’invalidité, vous pouvez demander une contre-expertise médicale ou saisir le tribunal compétent pour trancher le litige.
// `.trim();
//
// // Sujets sur lesquels les documents sont incomplets ou contradictoires.
// export const ADVISOR_ONLY_TOPICS = [
//   "Si l'assurance habitation est obligatoire ou non",
//   "Le délai de prescription (délai maximum pour réclamer une indemnité)",
//   "Les délais exacts de suspension / résiliation en cas de prime impayée",
//   "Le délai exact de déclaration d'un accident du travail",
//   "Les rentes accidents du travail en cas de polygamie, et le cumul des rentes",
//   "Les tarifs, primes chiffrées et devis précis",
//   "Le contenu exact des garanties de l'assurance Cyber Risques",
// ];
