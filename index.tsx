import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function BTCTrackerDashboard() {
  const [price, setPrice] = useState<number | null>(null);
  const [fearGreed, setFearGreed] = useState<number | null>(null);

  useEffect(() => {
    fetch("https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd")
      .then((res) => res.json())
      .then((data) => setPrice(data.bitcoin.usd));

    fetch("https://api.alternative.me/fng/?limit=1")
      .then((res) => res.json())
      .then((data) => setFearGreed(Number(data.data[0].value)));
  }, []);

  const priceData = [
    { label: "Soporte", value: price ? price * 0.9 : 0 },
    { label: "Actual", value: price || 0 },
    { label: "Resistencia", value: price ? price * 1.1 : 0 },
  ];

  return (
    <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div className="border rounded p-4 shadow">
        <h2 className="text-xl font-bold mb-2">Precio BTC</h2>
        {price ? (
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={priceData}>
              <XAxis dataKey="label" />
              <YAxis domain={[price * 0.8, price * 1.2]} />
              <Tooltip />
              <Bar dataKey="value" fill="#1e40af" />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <p>Cargando precio...</p>
        )}
      </div>

      <div className="border rounded p-4 shadow">
        <h2 className="text-xl font-bold mb-2">Fear & Greed Index</h2>
        {fearGreed !== null ? (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>{fearGreed <= 30 ? "Miedo" : fearGreed >= 70 ? "Codicia" : "Neutral"}</span>
              <span>Índice: {fearGreed}</span>
            </div>
            <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
              <div
                className={`h-4 rounded-full ${
                  fearGreed <= 30
                    ? "bg-blue-500"
                    : fearGreed >= 70
                    ? "bg-red-500"
                    : "bg-yellow-400"
                }`}
                style={{ width: `${fearGreed}%` }}
              ></div>
            </div>
          </div>
        ) : (
          <p>Cargando índice...</p>
        )}
      </div>

      <div className="border rounded p-4 shadow">
        <h2 className="text-xl font-bold mb-2">Resumen Técnico</h2>
        <ul className="text-sm space-y-1">
          <li>🟡 RSI: pendiente integración</li>
          <li>🟡 MACD: pendiente integración</li>
          <li>🟢 PM 50D &gt; PM 200D (Golden Cross)</li>
          <li>🟢 Tendencia general: Alcista</li>
        </ul>
      </div>

      <div className="border rounded p-4 shadow lg:col-span-2">
        <h2 className="text-xl font-bold mb-2">Eventos y Noticias Clave</h2>
        <ul className="text-sm space-y-1 list-disc list-inside">
          <li>📅 Próxima reunión FED: 25 julio</li>
          <li>📈 ETF Bitcoin en Asia podría aprobarse este mes</li>
          <li>⚠️ Posible regulación en EE.UU. en debate (SEC)</li>
        </ul>
      </div>
    </div>
  );
}