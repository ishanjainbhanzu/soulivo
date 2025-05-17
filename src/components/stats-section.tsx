import { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useCounter } from "@/hooks/use-counter";
import { Stat } from "@/lib/utils";

const stats: Stat[] = [
  { id: 1, value: 5000, label: "Clients Served", suffix: "+" },
  { id: 2, value: 25, label: "Certified Therapists", suffix: "" },
  { id: 3, value: 98, label: "Satisfaction Rate", suffix: "%" },
  { id: 4, value: 12, label: "Years of Experience", suffix: "+" },
];

export function StatsSection() {
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  useEffect(() => {
    if (inView) {
      controls.start((i) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.1, duration: 0.5 },
      }));
    }
  }, [controls, inView]);

  return (
    <section id="stats" ref={ref} className="py-16 bg-white dark:bg-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <StatItem key={stat.id} stat={stat} index={index} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}

function StatItem({ stat, index, inView }: { stat: Stat; index: number; inView: boolean }) {
  const { value, displayValue } = useCounter({
    start: 0,
    end: stat.value,
    duration: 2000,
    startCounting: inView,
  });

  return (
    <motion.div
      custom={index}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="text-center p-6"
    >
      <p className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-primary dark:text-primary mb-2">
        {displayValue}{stat.suffix}
      </p>
      <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">{stat.label}</p>
    </motion.div>
  );
}
