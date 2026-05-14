import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/i18n/LanguageContext";

const MentionsLegalesAssistantPage = () => {
  const { t, lang } = useLanguage();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Navbar />

      <section className="pt-32 pb-20 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-heading font-extrabold text-foreground mb-8">
              {lang === "fr"
                ? "Mentions Légales – Assistant Virtuel CPA"
                : lang === "en"
                ? "Legal Notice – CPA Virtual Assistant"
                : lang === "es"
                ? "Aviso Legal – Asistente Virtual CPA"
                : "الإشعارات القانونية – مساعد CPA الافتراضي"}
            </h1>

            <div className="prose prose-lg max-w-none space-y-6 text-foreground">
              <div className="bg-card rounded-2xl p-8 border border-border">
                <h2 className="text-2xl font-heading font-bold text-primary mb-4">
                  {lang === "fr"
                    ? "Informations légales"
                    : lang === "en"
                    ? "Legal Information"
                    : lang === "es"
                    ? "Información Legal"
                    : "المعلومات القانونية"}
                </h2>

                <div className="space-y-4 text-muted-foreground">
                  <p>
                    <strong>
                      {lang === "fr"
                        ? "Dénomination sociale"
                        : lang === "en"
                        ? "Company name"
                        : lang === "es"
                        ? "Razón social"
                        : "التسمية الاجتماعية"}
                    </strong>{" "}
                    : CPA - Conseil et Placement d'Assurances
                  </p>
                  <p>
                    <strong>
                      {lang === "fr"
                        ? "Forme juridique"
                        : lang === "en"
                        ? "Legal form"
                        : lang === "es"
                        ? "Forma jurídica"
                        : "الشكل القانوني"}
                    </strong>{" "}
                    : S.A.
                  </p>
                  <p>
                    <strong>
                      {lang === "fr"
                        ? "Capital social"
                        : lang === "en"
                        ? "Share capital"
                        : lang === "es"
                        ? "Capital social"
                        : "رأس المال"}
                    </strong>{" "}
                    : 5 000 000 DH
                  </p>
                  <p>
                    <strong>
                      {lang === "fr"
                        ? "Siège social"
                        : lang === "en"
                        ? "Headquarters"
                        : lang === "es"
                        ? "Sede social"
                        : "المقر الاجتماعي"}
                    </strong>{" "}
                    : Casablanca, Maroc
                  </p>
                  <p>
                    <strong>
                      {lang === "fr"
                        ? "Téléphone"
                        : lang === "en"
                        ? "Phone"
                        : lang === "es"
                        ? "Teléfono"
                        : "الهاتف"}
                    </strong>{" "}
                    : +212 5 22 95 39 00
                  </p>
                  <p>
                    <strong>Email:</strong>{" "}
                    <a
                      href="mailto:info@cpa.ma"
                      className="text-primary hover:underline"
                    >
                      info@cpa.ma
                    </a>
                  </p>
                </div>
              </div>

              <div className="bg-card rounded-2xl p-8 border border-border">
                <h2 className="text-2xl font-heading font-bold text-primary mb-4">
                  {lang === "fr"
                    ? "Collecte et traitement des données personnelles"
                    : lang === "en"
                    ? "Collection and Processing of Personal Data"
                    : lang === "es"
                    ? "Recopilación y Tratamiento de Datos Personales"
                    : "جمع ومعالجة البيانات الشخصية"}
                </h2>
                <p className="text-muted-foreground mb-4">
                  {lang === "fr"
                    ? "Les données personnelles susceptibles d'être collectées lors des échanges avec l'Assistant Virtuel CPA comprennent notamment :"
                    : lang === "en"
                    ? "The personal data that may be collected during interactions with the CPA Virtual Assistant includes:"
                    : lang === "es"
                    ? "Los datos personales que pueden recopilarse durante las interacciones con el Asistente Virtual CPA incluyen:"
                    : "البيانات الشخصية التي قد يتم جمعها أثناء التفاعلات مع مساعد CPA الافتراضي تشمل:"}
                </p>
                <ul className="list-disc list-inside ml-4 mt-2 space-y-1 text-muted-foreground">
                  <li>
                    {lang === "fr"
                      ? "Nom et prénom"
                      : lang === "en"
                      ? "First and last name"
                      : lang === "es"
                      ? "Nombre y apellido"
                      : "الاسم واللقب"}
                  </li>
                  <li>
                    {lang === "fr"
                      ? "Adresse e-mail"
                      : lang === "en"
                      ? "Email address"
                      : lang === "es"
                      ? "Correo electrónico"
                      : "البريد الإلكتروني"}
                  </li>
                  <li>
                    {lang === "fr"
                      ? "Numéro de téléphone"
                      : lang === "en"
                      ? "Phone number"
                      : lang === "es"
                      ? "Número de teléfono"
                      : "رقم الهاتف"}
                  </li>
                  <li>
                    {lang === "fr"
                      ? "Informations relatives aux demandes de devis ou d'assistance"
                      : lang === "en"
                      ? "Information related to quote or assistance requests"
                      : lang === "es"
                      ? "Información relacionada con solicitudes de cotización o asistencia"
                      : "المعلومات المتعلقة بطلبات العرض أو المساعدة"}
                  </li>
                  <li>
                    {lang === "fr"
                      ? "Données techniques et de connexion"
                      : lang === "en"
                      ? "Technical and connection data"
                      : lang === "es"
                      ? "Datos técnicos y de conexión"
                      : "البيانات التقنية وبيانات الاتصال"}
                  </li>
                </ul>

                <h3 className="text-lg font-semibold mt-6 mb-2 text-foreground">
                  {lang === "fr"
                    ? "Finalités de la collecte"
                    : lang === "en"
                    ? "Purposes of Collection"
                    : lang === "es"
                    ? "Finalidades de la Recopilación"
                    : "أغراض الجمع"}
                </h3>
                <ul className="list-disc list-inside ml-4 mt-2 space-y-1 text-muted-foreground">
                  <li>
                    {lang === "fr"
                      ? "de répondre à vos demandes ;"
                      : lang === "en"
                      ? "to respond to your requests;"
                      : lang === "es"
                      ? "para responder a sus solicitudes;"
                      : "للرد على طلباتكم؛"}
                  </li>
                  <li>
                    {lang === "fr"
                      ? "de vous accompagner dans vos démarches d'assurance ;"
                      : lang === "en"
                      ? "to assist you with your insurance procedures;"
                      : lang === "es"
                      ? "para acompañarle en sus trámites de seguros;"
                      : "للمساعدة في إجراءات التأمين الخاصة بكم؛"}
                  </li>
                  <li>
                    {lang === "fr"
                      ? "d'améliorer la qualité des services proposés ;"
                      : lang === "en"
                      ? "to improve the quality of services offered;"
                      : lang === "es"
                      ? "para mejorar la calidad de los servicios ofrecidos;"
                      : "لتحسين جودة الخدمات المقدمة؛"}
                  </li>
                  <li>
                    {lang === "fr"
                      ? "de vous recontacter, sous réserve de votre consentement."
                      : lang === "en"
                      ? "to contact you again, subject to your consent."
                      : lang === "es"
                      ? "para volver a contactarle, sujeto a su consentimiento."
                      : "للتواصل معكم مجددًا، بشرط موافقتكم."}
                  </li>
                </ul>
                <p className="text-muted-foreground mt-4">
                  {lang === "fr"
                    ? "Certaines données sont obligatoires afin d'assurer le bon fonctionnement du service et le traitement efficace de votre demande."
                    : lang === "en"
                    ? "Some data is mandatory to ensure the proper functioning of the service and the efficient processing of your request."
                    : lang === "es"
                    ? "Algunos datos son obligatorios para garantizar el correcto funcionamiento del servicio y el procesamiento eficiente de su solicitud."
                    : "بعض البيانات إلزامية لضمان سير الخدمة بشكل صحيح ومعالجة طلبكم بكفاءة."}
                </p>
              </div>

              <div className="bg-card rounded-2xl p-8 border border-border">
                <h2 className="text-2xl font-heading font-bold text-primary mb-4">
                  {lang === "fr"
                    ? "Destinataires des données"
                    : lang === "en"
                    ? "Data Recipients"
                    : lang === "es"
                    ? "Destinatarios de los Datos"
                    : "مستلمو البيانات"}
                </h2>
                <p className="text-muted-foreground mb-4">
                  {lang === "fr"
                    ? "Les données collectées sont destinées exclusivement :"
                    : lang === "en"
                    ? "The collected data is intended exclusively for:"
                    : lang === "es"
                    ? "Los datos recopilados están destinados exclusivamente a:"
                    : "البيانات المجمعة مخصصة حصريًا لـ:"}
                </p>
                <ul className="list-disc list-inside ml-4 mt-2 space-y-1 text-muted-foreground">
                  <li>
                    {lang === "fr"
                      ? "aux services habilités de CPA ;"
                      : lang === "en"
                      ? "CPA's authorized departments;"
                      : lang === "es"
                      ? "los departamentos autorizados de CPA;"
                      : "أقسام CPA المعتمدة؛"}
                  </li>
                  <li>
                    {lang === "fr"
                      ? "aux partenaires assureurs et prestataires techniques intervenant dans le cadre des services proposés ;"
                      : lang === "en"
                      ? "to insurance partners and technical service providers involved in the services offered;"
                      : lang === "es"
                      ? "a socios aseguradores y proveedores técnicos que intervienen en los servicios ofrecidos;"
                      : "للشركاء المؤمّنين ومقدمي الخدمات التقنية المشاركين في الخدمات المقدمة؛"}
                  </li>
                </ul>
                <p className="text-muted-foreground mt-4">
                  {lang === "fr"
                    ? "CPA s'engage à ne jamais vendre ni céder vos données personnelles à des tiers non autorisés."
                    : lang === "en"
                    ? "CPA commits to never selling or transferring your personal data to unauthorized third parties."
                    : lang === "es"
                    ? "CPA se compromete a no vender ni ceder sus datos personales a terceros no autorizados."
                    : "تلتزم CPA بعدم بيع أو نقل بياناتكم الشخصية إلى أطراف ثالثة غير مصرّح لها."}
                </p>
              </div>

              <div className="bg-card rounded-2xl p-8 border border-border">
                <h2 className="text-2xl font-heading font-bold text-primary mb-4">
                  {lang === "fr"
                    ? "Prospection commerciale"
                    : lang === "en"
                    ? "Commercial Prospecting"
                    : lang === "es"
                    ? "Prospección Comercial"
                    : "التنقيب التجاري"}
                </h2>
                <p className="text-muted-foreground">
                  {lang === "fr"
                    ? "Sous réserve de votre accord préalable, vos données pourront être utilisées afin de vous proposer des offres, produits ou services d'assurance adaptés à vos besoins, y compris par voie électronique."
                    : lang === "en"
                    ? "Subject to your prior consent, your data may be used to offer you insurance products, services or offers tailored to your needs, including electronically."
                    : lang === "es"
                    ? "Sujeto a su consentimiento previo, sus datos podrán ser utilizados para ofrecerle productos, servicios u ofertas de seguros adaptados a sus necesidades, incluidos por vía electrónica."
                    : "رهناً بموافقتكم المسبقة، قد تُستخدم بياناتكم لتقديم عروض أو منتجات أو خدمات تأمينية مناسبة لاحتياجاتكم، بما في ذلك إلكترونيًا."}
                </p>
                <p className="text-muted-foreground mt-4">
                  {lang === "fr"
                    ? "Vous pouvez à tout moment vous opposer à l'utilisation de vos données à des fins commerciales en contactant CPA :"
                    : lang === "en"
                    ? "You may at any time object to the use of your data for commercial purposes by contacting CPA:"
                    : lang === "es"
                    ? "Puede oponerse en cualquier momento al uso de sus datos con fines comerciales contactando a CPA:"
                    : "يمكنكم في أي وقت الاعتراض على استخدام بياناتكم لأغراض تجارية بالاتصال بـ CPA:"}
                </p>
                <ul className="list-disc list-inside ml-4 mt-2 space-y-1 text-muted-foreground">
                  <li>
                    {lang === "fr"
                      ? "par téléphone : +212 5 22 95 39 00"
                      : lang === "en"
                      ? "by phone: +212 5 22 95 39 00"
                      : lang === "es"
                      ? "por teléfono: +212 5 22 95 39 00"
                      : "هاتفياً: +212 5 22 95 39 00"}
                  </li>
                  <li>
                    {lang === "fr"
                      ? "par e-mail : info@cpa.ma"
                      : lang === "en"
                      ? "by email: info@cpa.ma"
                      : lang === "es"
                      ? "por correo electrónico: info@cpa.ma"
                      : "بالبريد الإلكتروني: info@cpa.ma"}
                  </li>
                </ul>
              </div>

              <div className="bg-card rounded-2xl p-8 border border-border">
                <h2 className="text-2xl font-heading font-bold text-primary mb-4">
                  {lang === "fr"
                    ? "Hébergement et transfert des données"
                    : lang === "en"
                    ? "Data Hosting and Transfer"
                    : lang === "es"
                    ? "Alojamiento y Transferencia de Datos"
                    : "استضافة ونقل البيانات"}
                </h2>
                <p className="text-muted-foreground">
  {lang === "fr"
    ? "L’ensemble des données utilisées dans le cadre des services digitaux et de l’Assistant Virtuel CPA est déployé, hébergé et traité exclusivement au Maroc sur des infrastructures sécurisées."
    : lang === "en"
    ? "All data used within CPA digital services and the CPA Virtual Assistant is deployed, hosted, and processed exclusively in Morocco on secure infrastructures."
    : lang === "es"
    ? "Todos los datos utilizados en los servicios digitales y en el Asistente Virtual CPA se implementan, alojan y procesan exclusivamente en Marruecos sobre infraestructuras seguras."
    : "يتم نشر واستضافة ومعالجة جميع البيانات المستخدمة ضمن الخدمات الرقمية ومساعد CPA الافتراضي حصريًا داخل المغرب على بنية تحتية آمنة."}
</p>

<p className="text-muted-foreground mt-4">
  {lang === "fr"
    ? "CPA applique les mesures techniques et organisationnelles nécessaires afin de garantir la sécurité, la confidentialité et la protection des données personnelles conformément à la réglementation marocaine en vigueur."
    : lang === "en"
    ? "CPA implements the necessary technical and organizational measures to ensure the security, confidentiality, and protection of personal data in compliance with applicable Moroccan regulations."
    : lang === "es"
    ? "CPA aplica las medidas técnicas y organizativas necesarias para garantizar la seguridad, confidencialidad y protección de los datos personales de conformidad con la normativa marroquí vigente."
    : "تطبق CPA جميع التدابير التقنية والتنظيمية اللازمة لضمان أمن وسرية وحماية المعطيات الشخصية وفقًا للتشريعات المغربية المعمول بها."}
</p>
              </div>

              <div className="bg-card rounded-2xl p-8 border border-border">
                <h2 className="text-2xl font-heading font-bold text-primary mb-4">
                  {lang === "fr"
                    ? "Durée de conservation"
                    : lang === "en"
                    ? "Data Retention Period"
                    : lang === "es"
                    ? "Período de Conservación"
                    : "مدة الاحتفاظ"}
                </h2>
                <p className="text-muted-foreground">
  {lang === "fr"
    ? "Les données collectées via l'Assistant Virtuel CPA sont conservées pour une durée maximale de 12 mois, sauf obligation légale contraire ou nécessité liée à la gestion de la relation client. Vous pouvez à tout moment demander la suppression ou la modification de vos données personnelles en envoyant un e-mail à : info@cpa.ma."
    : lang === "en"
    ? "Data collected via the CPA Virtual Assistant is retained for a maximum period of 12 months, unless otherwise required by law or necessary for customer relationship management. You may request the deletion or modification of your personal data at any time by sending an email to: info@cpa.ma."
    : lang === "es"
    ? "Los datos recopilados a través del Asistente Virtual CPA se conservan durante un período máximo de 12 meses, salvo que la ley exija lo contrario o sea necesario para la gestión de la relación con el cliente. Puede solicitar en cualquier momento la eliminación o modificación de sus datos personales enviando un correo electrónico a: info@cpa.ma."
    : "يتم الاحتفاظ بالبيانات التي يتم جمعها عبر مساعد CPA الافتراضي لمدة أقصاها 12 شهرًا، ما لم ينص القانون على خلاف ذلك أو تقتضي ضرورة إدارة العلاقة مع العميل ذلك. ويمكنكم في أي وقت طلب حذف أو تعديل بياناتكم الشخصية عبر إرسال بريد إلكتروني إلى: info@cpa.ma."}
</p>
              </div>

              <div className="bg-card rounded-2xl p-8 border border-border">
                <h2 className="text-2xl font-heading font-bold text-primary mb-4">
                  {lang === "fr"
                    ? "Sécurité et confidentialité"
                    : lang === "en"
                    ? "Security and Confidentiality"
                    : lang === "es"
                    ? "Seguridad y Confidencialidad"
                    : "الأمان والسرية"}
                </h2>
                <p className="text-muted-foreground mb-4">
                  {lang === "fr"
                    ? "CPA met en œuvre les mesures techniques, organisationnelles et de sécurité nécessaires afin de garantir :"
                    : lang === "en"
                    ? "CPA implements the necessary technical, organizational and security measures to guarantee:"
                    : lang === "es"
                    ? "CPA implementa las medidas técnicas, organizativas y de seguridad necesarias para garantizar:"
                    : "تُنفذ CPA التدابير التقنية والتنظيمية والأمنية اللازمة لضمان:"}
                </p>
                <ul className="list-disc list-inside ml-4 mt-2 space-y-1 text-muted-foreground">
                  <li>
                    {lang === "fr"
                      ? "la confidentialité des données ;"
                      : lang === "en"
                      ? "data confidentiality;"
                      : lang === "es"
                      ? "la confidencialidad de los datos;"
                      : "سرية البيانات؛"}
                  </li>
                  <li>
                    {lang === "fr"
                      ? "leur intégrité ;"
                      : lang === "en"
                      ? "their integrity;"
                      : lang === "es"
                      ? "su integridad;"
                      : "سلامتها؛"}
                  </li>
                  <li>
                    {lang === "fr"
                      ? "leur disponibilité ;"
                      : lang === "en"
                      ? "their availability;"
                      : lang === "es"
                      ? "su disponibilidad;"
                      : "توفرها؛"}
                  </li>
                  <li>
                    {lang === "fr"
                      ? "leur protection contre tout accès non autorisé, perte, altération ou divulgation."
                      : lang === "en"
                      ? "their protection against any unauthorized access, loss, alteration or disclosure."
                      : lang === "es"
                      ? "su protección contra cualquier acceso no autorizado, pérdida, alteración o divulgación."
                      : "حمايتها ضد أي وصول غير مصرّح به أو فقدان أو تعديل أو إفشاء."}
                  </li>
                </ul>
                <p className="text-muted-foreground mt-4">
                  {lang === "fr"
                    ? "L'accès aux données personnelles est strictement limité aux personnes habilitées dans le cadre de leurs fonctions."
                    : lang === "en"
                    ? "Access to personal data is strictly limited to authorized persons within the scope of their functions."
                    : lang === "es"
                    ? "El acceso a los datos personales está estrictamente limitado a las personas autorizadas en el marco de sus funciones."
                    : "الوصول إلى البيانات الشخصية محصور بشكل صارم في الأشخاص المصرّح لهم في إطار مهامهم."}
                </p>
              </div>

              <div className="bg-card rounded-2xl p-8 border border-border">
                <h2 className="text-2xl font-heading font-bold text-primary mb-4">
                  {lang === "fr"
                    ? "Vos droits"
                    : lang === "en"
                    ? "Your Rights"
                    : lang === "es"
                    ? "Sus Derechos"
                    : "حقوقكم"}
                </h2>
                <p className="text-muted-foreground mb-4">
                  {lang === "fr"
                    ? "Conformément à la Loi n°09-08 relative à la protection des personnes physiques à l'égard du traitement des données à caractère personnel, vous disposez des droits suivants :"
                    : lang === "en"
                    ? "In accordance with Law No. 09-08 on the protection of individuals with regard to the processing of personal data, you have the following rights:"
                    : lang === "es"
                    ? "De conformidad con la Ley n.º 09-08 sobre la protección de las personas físicas en lo que respecta al tratamiento de datos personales, usted tiene los siguientes derechos:"
                    : "وفقاً للقانون رقم 09-08 المتعلق بحماية الأشخاص الطبيعيين فيما يخص معالجة البيانات الشخصية، لديكم الحقوق التالية:"}
                </p>
                <ul className="list-disc list-inside ml-4 mt-2 space-y-1 text-muted-foreground">
                  <li>
                    {lang === "fr"
                      ? "droit d'accès ;"
                      : lang === "en"
                      ? "right of access;"
                      : lang === "es"
                      ? "derecho de acceso;"
                      : "الحق في الوصول؛"}
                  </li>
                  <li>
                    {lang === "fr"
                      ? "droit de rectification ;"
                      : lang === "en"
                      ? "right to rectification;"
                      : lang === "es"
                      ? "derecho a rectificación;"
                      : "الحق في التصحيح؛"}
                  </li>
                  <li>
                    {lang === "fr"
                      ? "droit d'opposition ;"
                      : lang === "en"
                      ? "right to object;"
                      : lang === "es"
                      ? "derecho de oposición;"
                      : "الحق في الاعتراض؛"}
                  </li>
                  <li>
                    {lang === "fr"
                      ? "droit d'effacement des données vous concernant."
                      : lang === "en"
                      ? "right to erasure of your data."
                      : lang === "es"
                      ? "derecho a supresión de sus datos."
                      : "الحق في محو بياناتكم."}
                  </li>
                </ul>
                <p className="text-muted-foreground mt-4">
                  {lang === "fr"
                    ? "Vous pouvez exercer vos droits en adressant votre demande accompagnée d'un justificatif d'identité valide :"
                    : lang === "en"
                    ? "You may exercise your rights by submitting your request accompanied by a valid identity document:"
                    : lang === "es"
                    ? "Puede ejercer sus derechos enviando su solicitud acompañada de un documento de identidad válido:"
                    : "يمكنكم ممارسة حقوقكم عن طريق إرسال طلبكم مشفوعاً بوثيقة هوية صالحة:"}
                </p>
                <ul className="list-disc list-inside ml-4 mt-2 space-y-1 text-muted-foreground">
                  <li>
                    {lang === "fr"
                      ? "par e-mail : info@cpa.ma"
                      : lang === "en"
                      ? "by email: info@cpa.ma"
                      : lang === "es"
                      ? "por correo electrónico: info@cpa.ma"
                      : "بالبريد الإلكتروني: info@cpa.ma"}
                  </li>
                  <li>
                    {lang === "fr"
                      ? "par téléphone : +212 5 22 95 39 00"
                      : lang === "en"
                      ? "by phone: +212 5 22 95 39 00"
                      : lang === "es"
                      ? "por teléfono: +212 5 22 95 39 00"
                      : "هاتفياً: +212 5 22 95 39 00"}
                  </li>
                </ul>
              </div>

              <div className="bg-card rounded-2xl p-8 border border-border">
                <h2 className="text-2xl font-heading font-bold text-primary mb-4">
                  {lang === "fr"
                    ? "Cookies et données de navigation"
                    : lang === "en"
                    ? "Cookies and Navigation Data"
                    : lang === "es"
                    ? "Cookies y Datos de Navegación"
                    : "ملفات تعريف الارتباط وبيانات التصفح"}
                </h2>
                <p className="text-muted-foreground">
                  {lang === "fr"
                    ? "Le site CPA Maroc peut utiliser des cookies ou technologies similaires afin d'améliorer l'expérience utilisateur, mesurer l'audience et optimiser les performances des services digitaux."
                    : lang === "en"
                    ? "The CPA Maroc website may use cookies or similar technologies to improve the user experience, measure audience and optimize the performance of digital services."
                    : lang === "es"
                    ? "El sitio web CPA Maroc puede utilizar cookies o tecnologías similares para mejorar la experiencia del usuario, medir la audiencia y optimizar el rendimiento de los servicios digitales."
                    : "يمكن لموقع CPA Maroc استخدام ملفات تعريف الارتباط أو تقنيات مماثلة لتحسين تجربة المستخدم، وقياس الجمهور، وتحسين أداء الخدمات الرقمية."}
                </p>
                <p className="text-muted-foreground mt-4">
                  {lang === "fr"
                    ? "L'utilisateur peut configurer son navigateur afin de limiter ou refuser l'utilisation des cookies."
                    : lang === "en"
                    ? "Users can configure their browser to limit or refuse the use of cookies."
                    : lang === "es"
                    ? "Los usuarios pueden configurar su navegador para limitar o rechazar el uso de cookies."
                    : "يمكن للمستخدمين تكوين متصفحهم للحد من استخدام ملفات تعريف الارتباط أو رفضها."}
                </p>
              </div>

              <div className="bg-card rounded-2xl p-8 border border-border">
                <h2 className="text-2xl font-heading font-bold text-primary mb-4">
                  {lang === "fr"
                    ? "Acceptation des conditions"
                    : lang === "en"
                    ? "Acceptance of Terms"
                    : lang === "es"
                    ? "Aceptación de los Términos"
                    : "قبول الشروط"}
                </h2>
                <p className="text-muted-foreground">
                  {lang === "fr"
                    ? "L'utilisation de l'Assistant Virtuel CPA implique l'acceptation pleine et entière des présentes mentions légales et de la politique de confidentialité de CPA."
                    : lang === "en"
                    ? "The use of the CPA Virtual Assistant implies full and complete acceptance of these legal notices and CPA's privacy policy."
                    : lang === "es"
                    ? "El uso del Asistente Virtual CPA implica la aceptación plena y completa de las presentes menciones legales y de la política de privacidad de CPA."
                    : "استخدام مساعد CPA الافتراضي يعني القبول الكامل والمطلق لهذه الإشعارات القانونية وسياسة خصوصية CPA."}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </motion.div>
  );
};

export default MentionsLegalesAssistantPage;