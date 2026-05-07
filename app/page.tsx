"use client";

import { useMemo, useState } from "react";

const PLAYERS = [
  "Edin","Sjoerd","Damian","Kevin","Daan","Alexander",
  "Marko","Gert","Arjan","Ray","Ashley","Sylvia","Ben","Suraj",
];

const MATCHES = [
  ["Edin","Sjoerd",0,2],
  ["Damian","Kevin",2,0],
  ["Daan","Alexander",2,1],
  ["Arjan","Ray",0,2],
  ["Sjoerd","Ben",2,1],
  ["Alexander","Edin",2,1],
  ["Gert","Damian",0,2],
  ["Ray","Daan",0,2],
  ["Ashley","Arjan",1,2],
  ["Ben","Kevin",2,1],
  ["Sjoerd","Alexander",2,0],
  ["Edin","Ray",2,1],
  ["Damian","Sylvia",2,0],
  ["Alexander","Ben",0,2],
  ["Gert","Kevin",1,2],
  ["Ray","Sjoerd",1,2],
  ["Ashley","Edin",1,2],
  ["Arjan","Damian",0,2],
  ["Ben","Gert",1,2],
  ["Kevin","Sylvia",2,1],
  ["Sjoerd","Ashley",2,0],
  ["Edin","Marko",2,0],
  ["Ray","Ben",2,0],
  ["Sylvia","Gert",0,2],
  ["Damian","Edin",1,2],
  ["Ben","Sylvia",2,0],
  ["Ray","Ashley",2,0],
  ["Kevin","Daan",0,2],
  ["Sjoerd","Damian",2,0],
  ["Marko","Ray",1,2],
  ["Daan","Gert",2,0],
  ["Edin","Kevin",2,0],
  ["Ben","Arjan",1,2],
  ["Sylvia","Daan",2,1],
  ["Gert","Edin",0,2],
  ["Kevin","Sjoerd",1,2],
  ["Marko","Ben",2,1],
  ["Damian","Ashley",2,0],
  ["Edin","Sylvia",2,1],
  ["Sjoerd","Gert",2,0],
  ["Ben","Daan",0,2],
  ["Marko","Damian",0,2],
  ["Arjan","Edin",0,2],
  ["Sylvia","Sjoerd",0,2],
  ["Ray","Kevin",2,0],
  ["Damian","Ben",2,0],
  ["Edin","Daan",1,2],
  ["Sjoerd","Arjan",2,0],
  ["Kevin","Ashley",1,2],
  ["Gert","Ray",0,2],
  ["Ben","Edin",2,0],
  ["Daan","Sjoerd",1,2],
  ["Suraj","Gert",2,0],
  ["Suraj","Ray",1,2],
  ["Suraj","Damian",1,2],
  ["Suraj","Ashley",1,2],
  ["Suraj","Daan",1,2],
  ["Suraj","Ben",0,2],
].map((m, i) => ({
  id: i + 1,
  player1: m[0],
  player2: m[1],
  score1: m[2],
  score2: m[3],
}));

export default function Page() {
  const [matches] = useState(MATCHES);
  const [selectedPlayer, setSelectedPlayer] = useState<string | null>(null);

  const standings = useMemo(() => calc(PLAYERS, matches), [matches]);

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-6 space-y-6">

      <h1 className="text-5xl font-black text-red-500">
        ULTIMOO DARTS
      </h1>

      {/* STANDINGS */}
      <div className="bg-zinc-900 p-6 rounded-2xl shadow">
        <h2 className="text-2xl mb-4 font-bold">Standings</h2>

        <div className="space-y-2">
          {standings.map((p, i) => {
            const status = getStatus(p, standings);

            return (
              <div
                key={p.name}
                onClick={() => setSelectedPlayer(p.name)}
                className={`flex justify-between px-4 py-2 rounded-xl cursor-pointer
                ${status==="safe"?"bg-green-800":
                  status==="out"?"bg-red-800":"bg-zinc-800"}`}
              >
                <span>{i+1}. {p.name}</span>

                <span className="font-bold text-sm text-right">
                  {p.points} pts | {p.legsFor}-{p.legsAgainst} | {p.diff > 0 ? "+" : ""}{p.diff} | {p.played}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* MATRIX */}
      <div className="bg-zinc-900 p-6 rounded-2xl overflow-auto">
        <h2 className="text-2xl mb-4 font-bold">Match Matrix</h2>

        <table className="border-collapse text-sm">
          <thead>
            <tr>
              <th></th>
              {PLAYERS.map(p => (
                <th key={p} className="p-2">{p}</th>
              ))}
            </tr>
          </thead>

          <tbody>
            {PLAYERS.map(r => (
              <tr key={r}>
                <td className="p-2 font-bold">{r}</td>

                {PLAYERS.map(c => {
                  if (r===c) return <td key={c}></td>;

                  const m = matches.find(x =>
                    (x.player1===r && x.player2===c) ||
                    (x.player1===c && x.player2===r)
                  );

                  let bg = "bg-zinc-800";

                  if (m) {
                    const win =
                      (m.player1===r && m.score1>m.score2) ||
                      (m.player2===r && m.score2>m.score1);

                    bg = win ? "bg-green-700" : "bg-red-700";
                  }

                  return (
                    <td key={c} className={`${bg} w-12 h-12 text-center`}>
                      {m
                        ? m.player1===r
                          ? `${m.score1}-${m.score2}`
                          : `${m.score2}-${m.score1}`
                        : "-"}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MATCHES */}
      <div className="bg-zinc-900 p-6 rounded-2xl">
        <h2 className="text-2xl mb-4 font-bold">All Matches</h2>

        <div className="space-y-2 max-h-[400px] overflow-auto">
          {matches.map(m => (
            <div key={m.id} className="flex justify-between bg-zinc-800 px-4 py-2 rounded-xl">
              <span className="w-1/3 text-right">{m.player1}</span>
              <span className="w-1/3 text-center font-black">{m.score1}-{m.score2}</span>
              <span className="w-1/3">{m.player2}</span>
            </div>
          ))}
        </div>
      </div>

      {/* PLAYOFFS */}
      <div className="bg-zinc-900 p-6 rounded-2xl">
        <h2 className="text-2xl mb-4 font-bold">Virtual Playoffs</h2>

        <div className="grid grid-cols-3 gap-6 text-center">
          <div className="space-y-3">
            <PlayMatch a={standings[0]?.name} b={standings[7]?.name} />
            <PlayMatch a={standings[3]?.name} b={standings[4]?.name} />
            <PlayMatch a={standings[1]?.name} b={standings[6]?.name} />
            <PlayMatch a={standings[2]?.name} b={standings[5]?.name} />
          </div>

          <div className="space-y-6 flex flex-col justify-center">
            <PlayMatch a="W1" b="W2" />
            <PlayMatch a="W3" b="W4" />
          </div>

          <div className="flex flex-col justify-center">
            <PlayMatch a="Finalist 1" b="Finalist 2" />
          </div>
        </div>
      </div>

      {/* PLAYER POPUP */}
      {selectedPlayer && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center">
          <div className="bg-zinc-900 p-6 rounded-xl w-96">
            <h2 className="text-xl mb-3 font-bold">{selectedPlayer}</h2>

            {renderStats(selectedPlayer, matches)}

            <button
              onClick={()=>setSelectedPlayer(null)}
              className="mt-4 bg-red-600 px-4 py-2 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/* HELPERS */

function calc(players:any, matches:any) {
  const t:any = {};

  players.forEach(p=>t[p]={
    name:p,
    points:0,
    legsFor:0,
    legsAgainst:0,
    diff:0,
    played:0
  });

  matches.forEach(m=>{
    t[m.player1].legsFor+=m.score1;
    t[m.player1].legsAgainst+=m.score2;
    t[m.player1].played+=1;

    t[m.player2].legsFor+=m.score2;
    t[m.player2].legsAgainst+=m.score1;
    t[m.player2].played+=1;

    if(m.score1>m.score2) t[m.player1].points+=2;
    else t[m.player2].points+=2;
  });

  Object.values(t).forEach((p:any)=>{
    p.diff = p.legsFor - p.legsAgainst;
  });

  return Object.values(t).sort((a:any,b:any)=>{
    if(b.points!==a.points) return b.points-a.points;
    if(b.diff!==a.diff) return b.diff-a.diff;
    return b.legsFor-a.legsFor;
  });
}

function getStatus(p:any, s:any[]) {
  const i = s.findIndex(x=>x.name===p.name);

  if(i<8){
    if(p.points - (s[8]?.points||0) > 4) return "safe";
    return "fight";
  } else {
    if((s[7]?.points||0)-p.points > 4) return "out";
    return "fight";
  }
}

function renderStats(name:string, matches:any[]) {
  const played = matches.filter(m=>m.player1===name||m.player2===name);

  const wins = played.filter(m =>
    (m.player1===name && m.score1>m.score2) ||
    (m.player2===name && m.score2>m.score1)
  );

  const opponents = new Set(
    played.map(m=>m.player1===name?m.player2:m.player1)
  );

  const remaining = PLAYERS.filter(p=>p!==name && !opponents.has(p));

  return (
    <div className="space-y-2">
      <div>Matches: {played.length}</div>
      <div>Wins: {wins.length}</div>
      <div>Winrate: {played.length?Math.round((wins.length/played.length)*100):0}%</div>

      <div className="mt-2 font-bold">Nog te spelen:</div>
      {remaining.map(r=><div key={r}>{r}</div>)}
    </div>
  );
}

function PlayMatch({ a, b }: any) {
  return (
    <div className="bg-zinc-800 rounded-xl p-3 border border-zinc-700">
      <div>{a}</div>
      <div className="border-t my-1"></div>
      <div>{b}</div>
    </div>
  );
}