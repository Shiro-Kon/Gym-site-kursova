import { FaCheckCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

type Props = {};

const AbonementsPage = (props: Props) => {
  const navigate = useNavigate();

  const tiers = [
    {
      name: "Абонемент без тренера",
      id: "tier-basic",
      priceMonthly: "₴500",
      description:
        "Ідеальний вибір для тих, хто хоче займатися самостійно, без допомоги тренера.",
      features: [
        "Безлімітний доступ до залу",
        "Користування усіма тренажерами",
        "Безкоштовні групові заняття",
        "Гнучкий графік",
      ],
      featured: false,
    },
    {
      name: "Абонемент з тренером",
      id: "tier-premium",
      priceMonthly: "₴1200",
      description:
        "Професійний тренер, індивідуальні тренування для досягнення найкращих результатів.",
      features: [
        "Все з базового абонемента",
        "Індивідуальні тренування з тренером",
        "Персоналізована програма",
        "Контроль прогресу і корекція техніки",
      ],
      featured: true,
    },
  ];

  const classNames = (...classes: string[]) =>
    classes.filter(Boolean).join(" ");

  const handleSelectAbonement = (abonement: (typeof tiers)[0]) => {
    // Перенаправляем на страницу добавления клиента, передаем абонемент в состоянии
    navigate("/add-client", { state: { selectedAbonement: abonement } });
  };

  return (
    <div className="relative isolate bg-[#7C9694] px-6 py-14 lg:px-8">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 -top-3 -z-10 transform-gpu overflow-hidden px-36 blur-3xl"
      >
        <div
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
          className="mx-auto aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30"
        />
      </div>
      <div className="mx-auto max-w-4xl text-center">
        <p className="mt-2 text-balance text-5xl font-semibold tracking-tight text-[#F6F6F7] sm:text-6xl">
          Виберіть ідеальний абонемент для себе
        </p>
      </div>
      <p className="mx-auto mt-6 max-w-2xl text-pretty text-center text-lg font-medium text-[#F6F6F7] sm:text-xl">
        Оберіть абонемент, який найкраще відповідає вашим цілям та рівню
        підготовки. Вибір з тренером або без — вам вирішувати!
      </p>
      <div className="mx-auto mt-16 grid max-w-lg grid-cols-1 items-center gap-y-6 sm:mt-20 sm:gap-y-0 lg:max-w-4xl lg:grid-cols-2">
        {tiers.map((tier, tierIdx) => (
          <div
            key={tier.id}
            className={classNames(
              tier.featured
                ? "relative bg-[#2C5C65] shadow-2xl"
                : "bg-white/60 sm:mx-8 lg:mx-0",
              tier.featured
                ? ""
                : tierIdx === 0
                ? "rounded-t-3xl sm:rounded-b-none lg:rounded-bl-3xl lg:rounded-tr-none"
                : "sm:rounded-t-none lg:rounded-bl-none lg:rounded-tr-3xl",
              "rounded-3xl p-8 ring-1 ring-[#2C5C65]/10 sm:p-10 -ml-5"
            )}
          >
            <h3
              id={tier.id}
              className={classNames(
                tier.featured ? "text-[#F6F6F7]" : "text-[#2C5C65]",
                "text-base font-semibold"
              )}
            >
              {tier.name}
            </h3>
            <p className="mt-4 flex items-baseline gap-x-2">
              <span
                className={classNames(
                  tier.featured ? "text-[#F6F6F7]" : "text-[#2C5C65]",
                  "text-5xl font-semibold tracking-tight"
                )}
              >
                {tier.priceMonthly}
              </span>
              <span
                className={classNames(
                  tier.featured ? "text-gray-400" : "text-gray-500",
                  "text-base"
                )}
              >
                /місяць
              </span>
            </p>
            <p
              className={classNames(
                tier.featured ? "text-gray-300" : "text-gray-600",
                "mt-6 text-base"
              )}
            >
              {tier.description}
            </p>
            <ul
              className={classNames(
                tier.featured ? "text-gray-300" : "text-gray-600",
                "mt-8 space-y-3 text-sm sm:mt-10"
              )}
            >
              {tier.features.map((feature) => (
                <li key={feature} className="flex gap-x-3">
                  <FaCheckCircle
                    aria-hidden="true"
                    className={classNames(
                      tier.featured ? "text-[#F6F6F7]" : "text-[#2C5C65]",
                      "h-6 w-5 flex-none"
                    )}
                  />
                  {feature}
                </li>
              ))}
            </ul>
            <button
              onClick={() => handleSelectAbonement(tier)}
              className={classNames(
                tier.featured
                  ? "bg-[#2C5C65] text-[#F6F6F7] ring-1 ring-inset ring-[#F6F6F7] hover:bg-[#2C5C65]/80 focus-visible:outline-[#2C5C65]"
                  : "text-[#2C5C65] ring-1 ring-inset ring-[#2C5C65]/50 hover:ring-[#2C5C65]/60 focus-visible:outline-[#2C5C65]",
                "mt-8 block rounded-md px-3.5 py-2.5 text-center text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 sm:mt-10"
              )}
            >
              Обрати абонемент
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AbonementsPage;
