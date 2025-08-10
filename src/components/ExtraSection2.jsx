import { motion } from "framer-motion";

const cardVariants = {
  offscreen: { opacity: 0, y: 80 },
  onscreen: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      bounce: 0.3,
      duration: 0.8,
    },
  },
};

const ExtraSection2 = () => {
  const cards = [
    {
      title: "Cultural Identity",
      desc: "Artifacts connect us to our heritage and preserve the unique values of past societies.",
      color: "blue",
    },
    {
      title: "Education & Research",
      desc: "Students, scholars, and historians rely on preserved items to learn from authentic sources.",
      color: "green",
    },
    {
      title: "Inspiration for Innovation",
      desc: "Ancient tools and inventions inspire today’s technology and creative thinking.",
      color: "rose",
    },
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="bg-indigo-100 py-16 px-6 rounded-3xl shadow-2xl mt-12 w-11/12 mx-auto"
    >
      <h2 className="text-4xl md:text-5xl font-bold text-center text-purple-800 mb-10">
        📜 Why Preserve History?
      </h2>

      <p className="max-w-3xl mx-auto text-gray-700 text-lg text-center mb-14 leading-relaxed">
        Historical artifacts are not just objects — they are voices from the past,
        offering us timeless insights into civilization, culture, and creativity. Their preservation
        ensures that human legacy lives on and inspires generations to come.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {cards.map((card, index) => (
          <motion.div
            key={card.title}
            variants={cardVariants}
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true, amount: 0.3 }}
            whileHover={{ scale: 1.05, rotate: [-1, 1, -1] }}
            className={`bg-${card.color}-50 p-6 rounded-2xl shadow-md border border-${card.color}-200 hover:shadow-xl transition-all`}
          >
            <h3 className={`text-2xl text-purple-500 font-semibold text-${card.color}-700 mb-3`}>
              {card.title}
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">{card.desc}</p>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default ExtraSection2;
