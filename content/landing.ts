import type { SiteContent } from "@/types/landing";

export const landingContent: SiteContent = {
  siteName: "KYIRA ENERGIES",
  logo: {
    // Fichiers nommés d'après le fond cible : dark = logo clair, light = logo foncé
    dark: "/logo-light.svg",
    light: "/logo-dark.svg",
  },

  navigation: [
    { label: "Solution", href: "#solution" },
    { label: "Méthode", href: "#methode" },
    { label: "Secteurs", href: "#secteurs" },
    { label: "Contact", href: "#contact" },
  ],

  hero: {
    title: "Réduisez vos coûts grâce à la récupération de chaleur",
    description:
      "Valorisez la chaleur perdue de vos installations frigorifiques pour couvrir vos besoins en eau chaude, réduire vos dépenses énergétiques et améliorer la performance de vos bâtiments tertiaires.",
    primaryCta: { label: "Demander un échange", href: "#contact" },
    secondaryCta: { label: "Découvrir la solution", href: "#solution" },
    reassurancePoints: [
      "Récupération de chaleur perdue",
      "Installations frigorifiques",
      "Eau chaude et besoins thermiques",
    ],
    backgroundImage: "/ventilation-illustration-05.jpg",
  },

  about: {
    id: "a-propos",
    eyebrow: "À propos",
    title:
      "Une approche concrète pour transformer la chaleur perdue en ressource utile",
    titleAccent: "chaleur perdue",
    paragraphs: [
      "Nous aidons les acteurs du tertiaire à identifier la chaleur récupérable sur leurs installations frigorifiques et à la valoriser pour leurs besoins en eau chaude, chauffage ou autres usages thermiques.",
      "Chaque projet est étudié selon les contraintes du site, les équipements existants et les objectifs énergétiques du bâtiment.",
    ],
    highlights: [
      "Récupération sur installations existantes",
      "Dimensionnement selon vos besoins réels",
      "Accompagnement jusqu'à la mise en œuvre",
    ],
    image: "/chaleur-illustration-01.jpg",
    imageAlt:
      "Intérieur d'un bâtiment tertiaire avec conduits de ventilation et installations industrielles.",
  },

  services: {
    id: "solution",
    eyebrow: "Solution",
    title: "Ce que permet la récupération de chaleur",
    description:
      "Une installation frigorifique rejette naturellement de la chaleur. L'enjeu est de la récupérer pour la transformer en ressource utile pour le bâtiment.",
    items: [
      {
        title: "Valoriser une énergie déjà produite",
        description:
          "La chaleur habituellement rejetée par les installations frigorifiques peut être récupérée au lieu d'être perdue.",
      },
      {
        title: "Produire de l'eau chaude",
        description:
          "La chaleur récupérée peut contribuer à couvrir des besoins en eau chaude selon les usages du bâtiment.",
      },
      {
        title: "Contribuer au chauffage",
        description:
          "Selon le site, cette énergie peut aussi participer à certains besoins de chauffage ou de confort thermique.",
      },
      {
        title: "Réduire les dépenses énergétiques",
        description:
          "En réutilisant une énergie déjà disponible, le bâtiment limite certaines consommations liées aux besoins thermiques.",
      },
    ],
    cta: { label: "Étudier mon potentiel", href: "#contact" },
  },

  method: {
    id: "methode",
    eyebrow: "Méthode",
    title: "De vos installations frigorifiques à une",
    titleAccent: "chaleur valorisée",
    description:
      "Une démarche simple et lisible, pensée pour des décideurs qui souhaitent comprendre chaque étape.",
    image: "/technician-inspecting-hvac-system.jpeg",
    imageAlt:
      "Deux techniciens en tenue de sécurité inspectent des installations frigorifiques et des réseaux de tuyauterie sur site.",
    steps: [
      {
        step: "01",
        title: "Comprendre vos installations frigorifiques",
        description:
          "Prise de connaissance de vos équipements, usages et contraintes de site.",
      },
      {
        step: "02",
        title: "Identifier le potentiel récupérable",
        description:
          "Évaluation de la chaleur disponible et des possibilités de valorisation.",
      },
      {
        step: "03",
        title: "Définir la solution adaptée",
        description:
          "Proposition dimensionnée selon vos besoins thermiques et les contraintes du bâtiment.",
      },
      {
        step: "04",
        title: "Accompagner la mise en œuvre",
        description:
          "Suivi du déploiement et vérification du bon fonctionnement de la solution.",
      },
    ],
  },

  sectors: {
    id: "secteurs",
    eyebrow: "Secteurs",
    title: "Une solution adaptée aux usages du tertiaire",
    titleAccent: "usages du tertiaire",
    description:
      "La récupération de chaleur peut être pertinente pour les sites disposant d'équipements de froid, de besoins réguliers en eau chaude ou d'usages thermiques à optimiser.",
    items: [
      {
        title: "Commerces et grande distribution",
        description: "Froid commercial, eau chaude, confort thermique.",
      },
      {
        title: "Hôtellerie et restauration",
        description: "Froid cuisine, eau chaude sanitaire, besoins de confort.",
      },
      {
        title: "Bureaux et bâtiments tertiaires",
        description:
          "Besoins thermiques, performance énergétique, maîtrise des coûts.",
      },
      {
        title: "Bâtiments publics et collectivités",
        description:
          "Valorisation énergétique et réduction des consommations utiles.",
      },
    ],
  },

  // Placeholders illustratifs — à remplacer par des avis clients confirmés.
  testimonials: {
    id: "avis",
    watermark: "avis",
    // TODO: confirmer le volume clients avant publication
    statValue: "24",
    statSuffix: "+",
    statLabel: "clients satisfaits",
    items: [
      {
        title: "Approche claire",
        quote:
          "L'étude de potentiel a rapidement mis en évidence la chaleur récupérable sur nos groupes de froid. La proposition était concrète, chiffrée et adaptée à nos contraintes de site.",
        author: "Claire M.",
        role: "Responsable technique · commerce",
        initials: "CM",
      },
      {
        title: "Accompagnement fluide",
        quote:
          "De l'analyse initiale au suivi de mise en œuvre, l'échange a été simple et professionnel. Nous valorisons désormais une énergie jusqu'alors perdue pour nos besoins en eau chaude.",
        author: "Julien R.",
        role: "Directeur d'exploitation · hôtellerie",
        initials: "JR",
      },
    ],
  },

  faq: {
    id: "faq",
    eyebrow: "Questions fréquentes",
    title: "Vos questions sur la récupération de chaleur",
    description:
      "Retrouvez les réponses aux questions les plus fréquentes avant d'étudier le potentiel énergétique de votre bâtiment.",
    cta: { label: "Poser une question", href: "#contact" },
    items: [
      {
        question: "Qu'est-ce que la récupération de chaleur ?",
        answer:
          "La récupération de chaleur consiste à capter une chaleur habituellement rejetée par un équipement, comme une installation frigorifique, pour la réutiliser dans le bâtiment.",
      },
      {
        question: "Quels bâtiments peuvent être concernés ?",
        answer:
          "Les bâtiments tertiaires disposant d'installations frigorifiques ou de besoins réguliers en eau chaude, chauffage ou autres usages thermiques peuvent présenter un potentiel.",
      },
      {
        question: "Faut-il remplacer les installations existantes ?",
        answer:
          "Pas nécessairement. La première étape consiste à étudier les équipements déjà présents afin d'identifier si une récupération de chaleur est possible.",
      },
      {
        question: "À quoi peut servir la chaleur récupérée ?",
        answer:
          "Selon le bâtiment, la chaleur récupérée peut contribuer à produire de l'eau chaude, participer au chauffage ou répondre à d'autres besoins thermiques adaptés.",
      },
      {
        question: "Comment savoir si mon site a un potentiel ?",
        answer:
          "Une première analyse permet de comprendre vos installations frigorifiques, vos usages et vos besoins thermiques afin d'identifier les possibilités de valorisation.",
      },
      {
        question: "Comment se déroule l'accompagnement ?",
        answer:
          "L'accompagnement passe par la compréhension du site, l'étude du potentiel récupérable, la définition d'une solution adaptée puis le suivi du projet.",
      },
      {
        question: "Quels éléments fournir pour une première analyse ?",
        answer:
          "Vous pouvez partager le type de bâtiment, les installations frigorifiques présentes, vos besoins en eau chaude ou chauffage, ainsi que toute information utile sur vos consommations.",
      },
    ],
  },

  contact: {
    id: "contact",
    eyebrow: "Contact",
    title: "Étudions votre potentiel de récupération de chaleur",
    titleAccent: "récupération de chaleur",
    description:
      "Décrivez votre bâtiment, vos installations ou votre besoin énergétique. Un premier échange permettra d'identifier les pistes possibles de valorisation.",
    messageLabel: "Message",
    messagePlaceholder:
      "Décrivez brièvement votre bâtiment, vos installations ou votre besoin énergétique…",
    submitLabel: "Envoyer la demande",
    submittingLabel: "Envoi en cours…",
    successMessage:
      "Votre demande a bien été envoyée. Nous vous recontacterons rapidement.",
    errorMessages: {
      validation:
        "Vérifiez les champs obligatoires et réessayez.",
      turnstile:
        "La vérification anti-spam a échoué. Merci de réessayer.",
      config:
        "L'envoi est temporairement indisponible. Réessayez plus tard.",
      send: "L'envoi a échoué. Merci de réessayer dans quelques instants.",
    },
    fieldErrors: {
      required: "Ce champ est obligatoire.",
      email: "Saisissez une adresse email valide.",
      turnstile: "Merci de valider la vérification anti-spam.",
    },
    reassurancePoints: [
      "Premier échange pour comprendre votre besoin",
      "Analyse du potentiel selon votre site",
      "Orientation vers une solution adaptée",
    ],
    fields: [
      {
        name: "name",
        label: "Nom",
        placeholder: "Votre nom",
        type: "text",
        autoComplete: "name",
        required: true,
      },
      {
        name: "company",
        label: "Entreprise",
        placeholder: "Nom de votre entreprise",
        type: "text",
        autoComplete: "organization",
        required: true,
      },
      {
        name: "email",
        label: "Email",
        placeholder: "votre.email@entreprise.fr",
        type: "email",
        autoComplete: "email",
        required: true,
      },
      {
        name: "phone",
        label: "Téléphone",
        placeholder: "Votre numéro",
        type: "tel",
        autoComplete: "tel",
        required: false,
      },
    ],
    directContact: {
      name: "Yannis Miame",
      role: "Dirigeant",
      photo: "/yannis-miame-profil.jpg",
    },
  },

  footer: {
    tagline:
      "Récupération de chaleur et performance énergétique pour bâtiments tertiaires",
    usefulLinks: [
      { label: "Accueil", href: "#accueil" },
      { label: "Solution", href: "#solution" },
      { label: "Méthode", href: "#methode" },
      { label: "Contact", href: "#contact" },
    ],
    legalLinks: [
      { label: "Mentions légales", href: "/mentions-legales" },
      { label: "Politique de confidentialité", href: "/politique-confidentialite" },
    ],
    copyright: "© KYIRA ENERGIES. Tous droits réservés.",
  },
};
