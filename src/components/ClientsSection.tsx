import { motion } from "framer-motion";
import { useLanguage } from "@/i18n/LanguageContext";

// Import all client logos
import aeveaLogo from "@/assets/clients/aevea.png";
import agrotecLogo from "@/assets/clients/agrotec.png";
import airarabiaLogo from "@/assets/clients/airarabia.png";
import americanaLogo from "@/assets/clients/americana.png";
import aquamagLogo from "@/assets/clients/aquamag.png";
import bcmaLogo from "@/assets/clients/b.c.m.a.png";
import biscolandLogo from "@/assets/clients/biscoland.png";
import bluebirdsLogo from "@/assets/clients/bluebirds.png";
import camusatLogo from "@/assets/clients/camusat.png";
import cdmLogo from "@/assets/clients/cdm.png";
import chaabaneLogo from "@/assets/clients/chaabane.png";
import cocacolaLogo from "@/assets/clients/coca-cola.png";
import cogepraLogo from "@/assets/clients/cogepra.png";
import copimaLogo from "@/assets/clients/copima.png";
import coscoLogo from "@/assets/clients/cosco.png";
import deniaLogo from "@/assets/clients/denia.png";
import effiplastLogo from "@/assets/clients/effiplast.png";
import elcorLogo from "@/assets/clients/elcor.png";
import ereveLogo from "@/assets/clients/ereve.png";
import fadesolLogo from "@/assets/clients/fadesol.png";
import fmsarLogo from "@/assets/clients/federation marocaine des societes d'assurances et de reassurance.png";
import ghandiLogo from "@/assets/clients/ghandiclinique.png";
import guessLogo from "@/assets/clients/guessclinic.png";
import haslerLogo from "@/assets/clients/hasler.png";
import ifssateLogo from "@/assets/clients/ifssate group.png";
import indeaLogo from "@/assets/clients/indea.png";
import kfcLogo from "@/assets/clients/kfc.png";
import krispykremeLogo from "@/assets/clients/krispykreme.png";
import layherLogo from "@/assets/clients/layher.png";
import lilialLogo from "@/assets/clients/lilial.png";
import massLogo from "@/assets/clients/mass.png";
import mocrrLogo from "@/assets/clients/moroccan office of copyright and related rights.png";
import ocaLogo from "@/assets/clients/oca.png";
import ocidmetalLogo from "@/assets/clients/ocidmetal.png";
import oulmesLogo from "@/assets/clients/oulmes.png";
import radioplusLogo from "@/assets/clients/radioplus.png";
import regionalLogo from "@/assets/clients/regional.png";
import scandimarLogo from "@/assets/clients/scandimar.png";
import sixtLogo from "@/assets/clients/sixt.png";
import smartcompositeLogo from "@/assets/clients/smartcompositecompany.png";
import smtsLogo from "@/assets/clients/smts.png";
import sophiacoLogo from "@/assets/clients/sophiaco.png";
import takadoLogo from "@/assets/clients/takado.png";
import umelLogo from "@/assets/clients/umel.png";
import usaembassyLogo from "@/assets/clients/usaembasst.png";
import yellowrockLogo from "@/assets/clients/yellowrock.png";
import jpsLogo from "@/assets/clients/jps.png";
import pkflogo from "@/assets/clients/pkf.png";
import olaLogo from "@/assets/clients/ola.png";

const clients = [
  { name: "Americana Restaurants", logo: americanaLogo },
  { name: "USA Embassy", logo: usaembassyLogo },
  { name: "Krispy Kreme", logo: krispykremeLogo },
  { name: "KFC", logo: kfcLogo },
  { name: "Crédit du Maroc", logo: cdmLogo },
  { name: "Air Arabia", logo: airarabiaLogo },
  { name: "COSCO Shipping", logo: coscoLogo },
  { name: "Les Eaux Minérales d'Oulmès", logo: oulmesLogo },
  { name: "Sixt", logo: sixtLogo },
  { name: "Layher", logo: layherLogo },
  { name: "Regional Airlines", logo: regionalLogo },
  { name: "OCA Global", logo: ocaLogo },
  { name: "Clinique Ghandi", logo: ghandiLogo },
  { name: "Camusat", logo: camusatLogo },
  { name: "Agrotec", logo: agrotecLogo },
  { name: "Biscoland", logo: biscolandLogo },
  { name: "COGEPRA", logo: cogepraLogo },
  { name: "Scandimar", logo: scandimarLogo },
  { name: "Hasler Group", logo: haslerLogo },
  { name: "Copima", logo: copimaLogo },
  { name: "Elcor", logo: elcorLogo },
  { name: "Radio Plus", logo: radioplusLogo },
  { name: "Smart Composite Company", logo: smartcompositeLogo },
  { name: "INDEA", logo: indeaLogo },
  { name: "Bluebirds", logo: bluebirdsLogo },
  { name: "Effiplast", logo: effiplastLogo },
  { name: "Yellow Rock", logo: yellowrockLogo },
  { name: "Fadesol", logo: fadesolLogo },
  { name: "Umel", logo: umelLogo },
  { name: "Coca-Cola", logo: cocacolaLogo },
  { name: "AEVEA", logo: aeveaLogo },
  { name: "Aquamag", logo: aquamagLogo },
  { name: "B.C.M.A", logo: bcmaLogo },
  { name: "Chaabane", logo: chaabaneLogo },
  { name: "Denia", logo: deniaLogo },
  { name: "Ereve", logo: ereveLogo },
  { name: "FMSAR", logo: fmsarLogo },
  { name: "Guess Clinic", logo: guessLogo },
  { name: "IFSSATE Group", logo: ifssateLogo },
  { name: "Lilial", logo: lilialLogo },
  { name: "MASS", logo: massLogo },
  { name: "MOCRR", logo: mocrrLogo },
  { name: "Ocidmetal", logo: ocidmetalLogo },
  { name: "SMTS", logo: smtsLogo },
  { name: "Sophiaco", logo: sophiacoLogo },
  { name: "Takado", logo: takadoLogo },
  { name: "ola", logo: olaLogo },
  { name: "pkf", logo: pkflogo },
  { name: "jps", logo: jpsLogo },
];

const ClientsSection = () => {
  const { t } = useLanguage();

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <span className="text-accent font-semibold text-sm tracking-wide uppercase">{t("clients_badge")}</span>
          <h2 className="text-3xl md:text-4xl font-heading font-extrabold text-foreground mt-3 mb-4">{t("clients_title")}</h2>
        </motion.div>

        <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-7 lg:grid-cols-10 gap-3 max-w-7xl mx-auto">
          {clients.map((client, i) => (
            <motion.div
              key={client.name}
              initial={{ opacity: 0, rotateY: -90, scale: 0.8 }}
              whileInView={{ opacity: 1, rotateY: 0, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ 
                delay: (i % 18) * 0.05,
                duration: 0.6,
                type: "spring",
                stiffness: 100
              }}
              whileHover={{ 
                rotateY: 180,
                transition: { duration: 0.6, ease: "easeInOut" }
              }}
              className="relative aspect-square cursor-pointer"
              style={{ 
                transformStyle: "preserve-3d",
                perspective: "1000px"
              }}
            >
              {/* Front of card - Logo */}
              <div 
                className="absolute inset-0 bg-card rounded-lg border border-border p-3 flex items-center justify-center cpa-shadow hover:cpa-shadow-lg hover:border-primary/50 transition-all"
                style={{ 
                  backfaceVisibility: "hidden",
                  WebkitBackfaceVisibility: "hidden"
                }}
              >
                <img
                  src={client.logo}
                  alt={client.name}
                  className="w-full h-full object-contain"
                  loading="lazy"
                />
              </div>
              
              {/* Back of card - Name */}
              <div 
                className="absolute inset-0 bg-gradient-to-br from-primary/90 to-accent/90 rounded-lg border border-primary p-3 flex items-center justify-center cpa-shadow-lg"
                style={{ 
                  backfaceVisibility: "hidden",
                  WebkitBackfaceVisibility: "hidden",
                  transform: "rotateY(180deg)"
                }}
              >
                <p className="text-white text-center text-xs sm:text-sm font-semibold leading-tight">
                  {client.name}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientsSection;
