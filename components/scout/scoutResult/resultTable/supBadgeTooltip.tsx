import { useTranslation } from "react-i18next";

export default function SupBadgeTooltip() {
  const { t } = useTranslation();
  return (
    <div>
      <div>
        <h3>{t("scout.result.supBadge.top")}</h3>
      </div>
      <p>{t("scout.result.supBadge.topDesc")}</p>
      <div>
        <h3>{t("scout.result.supBadge.major")}</h3>
      </div>
      <p>{t("scout.result.supBadge.majorDesc")}</p>
      <div>
        <h3>{t("scout.result.supBadge.risingStar")}</h3>
      </div>
      <p>{t("scout.result.supBadge.risingStarDesc")}</p>
    </div>
  );
}
