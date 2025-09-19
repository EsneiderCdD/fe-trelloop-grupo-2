"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import DashboardSidebar from "components/home/DashboardSidebar";
import UserNavbar from "components/home/UserNavbar";
import { useCardForm } from "hooks/useCardForm";
import { deleteCardById, moveCardToList } from "services/cardService";
import { getBoardListsService } from "services/boardListService";

/* ---------- Utils ---------- */
const norm = (s: string) => s?.toLowerCase().replace(/[_-]/g, " ").trim();

function getPriorityChip(priorityRaw: string | undefined) {
  const p = norm(String(priorityRaw || ""));
  if (!p) return null;
  if (["alta", "high"].includes(p))
    return { label: "Alta prioridad", style: { backgroundColor: "rgba(167,0,0,1)", color: "#fff" } };
  if (["media", "medium"].includes(p))
    return { label: "Media", style: { backgroundColor: "rgba(223,130,0,1)", color: "#111" } };
  if (["baja", "low"].includes(p))
    return { label: "Baja", style: { backgroundColor: "rgba(102,112,133,1)", color: "#fff" } };
  return null;
}

const PALETTE = ["#2E90FA", "#12B76A", "#F59E0B", "#A855F7", "#EF4444", "#06B6D4", "#F97316", "#22C55E", "#EAB308", "#DB2777"];
const hashIndex = (str: string, mod: number) => {
  let h = 0;
  for (let i = 0; i < str.length; i++) { h = (h << 5) - h + str.charCodeAt(i); h |= 0; }
  return Math.abs(h) % mod;
};
const contrastText = (hex: string) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  const yiq = (r * 299 + g * 587 + b * 114) / 1000;
  return yiq >= 160 ? "#111" : "#fff";
};

function Pill({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <span className="px-3 py-0.5 rounded-[16px] text-[11px]" style={{ backgroundColor: "#414141", color: "#E5E7EB", ...style }}>
      {children}
    </span>
  );
}

/* ---------- Subtareas (mock/arcodeado) ---------- */
type MockSubtask = {
  id: number;
  title: string;
  assignee: string;
  due?: string | null;
  done: boolean;
};
const MOCK_SUBTASKS: MockSubtask[] = [
  { id: 1, title: "Implementar diseño", assignee: "Iván Andrade", due: null, done: true },
  { id: 2, title: "Implementar diseño", assignee: "Iván Andrade", due: "DD-MM-YYYY", done: false },
  { id: 3, title: "Implementar diseño", assignee: "Iván Andrade", due: "DD-MM-YYYY", done: false },
];

/* ---------- Comentarios (mock/arcodeado) ---------- */
type CommentItem = {
  id: number;
  author: string;
  avatar?: string;
  body: string;
  dateLabel: string; // p.ej. "hace 8 horas", "ayer"
};

function CommentsPanel() {
  const [comments, setComments] = React.useState<CommentItem[]>([
    {
      id: 1,
      author: "Nombre completo",
      avatar: "/assets/avatars/default.png",
      body:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      dateLabel: "hace 8 horas",
    },
    {
      id: 2,
      author: "Nombre completo",
      avatar: "/assets/avatars/default.png",
      body:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      dateLabel: "ayer",
    },
  ]);
  const [newComment, setNewComment] = React.useState("");

  const addComment = () => {
    const text = newComment.trim();
    if (!text) return;
    setComments((prev) => [
      {
        id: Date.now(),
        author: "Tú",
        avatar: "/assets/avatars/default.png",
        body: text,
        dateLabel: "ahora",
      },
      ...prev,
    ]);
    setNewComment("");
  };

  return (
    <div className="rounded-lg bg-[#272727] p-4 border border-[rgba(60,60,60,0.7)]">
      {/* Título con icono (como en la captura) */}
      <div className="flex items-center gap-2 mb-3">
        <svg width="18" height="18" viewBox="0 0 24 24" className="opacity-80">
          <path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4v8z" fill="currentColor" />
        </svg>
        <span className="text-[13px] font-medium">Comentarios</span>
      </div>

      {/* Composer compacto */}
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full overflow-hidden bg-[#1f1f1f] flex items-center justify-center shrink-0">
          <img
            src="/assets/avatars/default.png"
            alt="avatar"
            className="w-full h-full object-cover"
            onError={(e: any) => (e.currentTarget.style.display = "none")}
          />
        </div>

        <textarea
          className="flex-1 h-[70px] bg-[#1f1f1f] rounded-[10px] p-3 border border-[rgba(60,60,60,0.7)] focus:outline-none placeholder:opacity-60"
          placeholder="Escribe aquí..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />

        <button
          type="button"
          onClick={addComment}
          className="h-[32px] px-4 rounded-[8px] text-sm bg-[#6A5FFF] hover:bg-[#5A4FEF] text-white font-medium self-center"
        >
          Enviar
        </button>
      </div>

      {/* Lista de comentarios (compacta) */}
      <div className="mt-4 max-h-[420px] overflow-y-auto pr-2 flex flex-col gap-5">
        {comments.map((c) => (
          <div key={c.id} className="flex gap-3">
            <div className="w-8 h-8 rounded-full overflow-hidden bg-[#1f1f1f] flex-shrink-0">
              <img
                src={c.avatar || "/assets/avatars/default.png"}
                alt={c.author}
                className="w-full h-full object-cover"
                onError={(e: any) => (e.currentTarget.style.display = "none")}
              />
            </div>

            <div className="flex-1">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-[14px]">{c.author}</span>
                  <span className="text-[11px] opacity-60">{c.dateLabel}</span>
                </div>
                <button className="p-1 rounded hover:bg-[#333]" title="Opciones">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <circle cx="12" cy="5" r="2" />
                    <circle cx="12" cy="12" r="2" />
                    <circle cx="12" cy="19" r="2" />
                  </svg>
                </button>
              </div>

              <p className="mt-1 text-[13px] leading-[1.4] opacity-90">{c.body}</p>

              <button
                type="button"
                className="mt-2 text-[11px] opacity-70 hover:opacity-100"
                onClick={() => {/* mock */}}
              >
                Responder
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------- Vista Detallada ---------- */
export default function CardDetail() {
  const router = useRouter();
  const params = useParams<{ boardId: string; listId: string; cardId: string }>();
  const boardId = Number(params.boardId);
  const listId = Number(params.listId);
  const cardId = Number(params.cardId);

  const { form, loading, error, handleFormChange, handleDateChange, handleSubmit } = useCardForm();

  const [menuOpen, setMenuOpen] = useState(false);
  const [lists, setLists] = useState<{ id: number; name: string }[]>([]);
  const [moving, setMoving] = useState(false);
  const [targetList, setTargetList] = useState<number | null>(null);

  // subtareas locales (UI only)
  const [subtasks, setSubtasks] = useState<MockSubtask[]>(MOCK_SUBTASKS);
  const completed = subtasks.filter((t) => t.done).length;
  const progressPct = subtasks.length ? Math.round((completed / subtasks.length) * 100) : 0;

  useEffect(() => {
    (async () => {
      try {
        const data = await getBoardListsService(String(boardId));
        setLists((data || []).map((l: any) => ({ id: l.id, name: l.name })));
      } catch {}
    })();
  }, [boardId]);

  const priorityChip = useMemo(() => getPriorityChip(form.priority), [form.priority]);
  const currentListName = lists.find((l) => l.id === listId)?.name || "";
  const listBg = useMemo(
    () => (currentListName ? PALETTE[hashIndex(currentListName, PALETTE.length)] : "#2B2B2B"),
    [currentListName]
  );
  const listText = useMemo(() => contrastText(listBg), [listBg]);

  const onMove = async () => {
    if (!targetList) return;
    try {
      setMoving(true);
      await moveCardToList(boardId, listId, cardId, targetList);
      router.push(`/boardList/${boardId}`);
    } catch {
      alert("No se pudo mover la tarjeta");
    } finally {
      setMoving(false);
      setMenuOpen(false);
    }
  };

  const onDelete = async () => {
    try {
      await deleteCardById(boardId, listId, cardId);
      router.push(`/boardList/${boardId}`);
    } catch (e: any) {
      alert(e?.message || "Error eliminando la tarjeta");
    }
  };

  if (loading) return <div className="p-6 text-white">Cargando tarjeta...</div>;
  if (error) return <div className="p-6 text-red-300">{error}</div>;

  return (
    <div className="flex min-h-screen w-full bg-[#191919]">
      {/* Sidebar con el fondo/borde requeridos */}
      <div
        className="shrink-0 min-h-screen"
        style={{ background: "rgba(0, 0, 0, 0.07)", borderRight: "1px solid rgba(43, 43, 43, 1)" }}
      >
        <DashboardSidebar />
      </div>

      {/* Contenido */}
      <div className="min-w-0 w-full text-white">
        <UserNavbar showCreateBoardButton={false} />

        <div className="px-6 pb-10">
          {/* Barra superior */}
          <div className="w-[1124px] max-w-full mx-auto">
            <div className="flex items-center justify-between h-[40px] rounded-lg border border-[rgba(60,60,60,0.7)] bg-[#272727] px-4">
              <div className="flex items-center gap-3">
                <button onClick={() => router.push(`/boardList/${boardId}`)} className="p-1 rounded hover:bg-[#333]" aria-label="Volver">
                  <img src="/assets/icons/arrow-left.svg" alt="Volver" className="w-5 h-5" />
                </button>
                <span className="opacity-70">Volver</span>
              </div>

              <div className="relative">
                <button onClick={() => setMenuOpen((v) => !v)} className="p-1 rounded hover:bg-[#333]">
                  <img src="/assets/icons/ellipsis.svg" className="w-6 h-6 rotate-90" alt="opciones" />
                </button>
                {menuOpen && (
                  <div className="absolute right-0 mt-2 w-[249px] rounded-lg bg-black p-4 flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      <select
                        className="flex-1 bg-[#2b2b2b] border border-[rgba(60,60,60,0.7)] rounded px-2 py-1"
                        value={targetList ?? ""}
                        onChange={(e) => setTargetList(Number(e.target.value))}
                      >
                        <option value="" disabled>
                          Mover tarjeta de lista
                        </option>
                        {lists.map((l) => (
                          <option key={l.id} value={l.id}>
                            {l.name}
                          </option>
                        ))}
                      </select>
                      <button disabled={!targetList || moving} onClick={onMove} className="px-3 py-1 rounded bg-[#6A5FFF] disabled:opacity-50">
                        Mover
                      </button>
                    </div>
                    <button onClick={onDelete} className="w-full text-left px-3 py-2 rounded hover:bg-[#1f1f1f]">
                      Eliminar tarjeta
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Cuerpo principal */}
          <div className="mt-4 w-[1124px] max-w-full mx-auto flex gap-4">
            {/* Columna izquierda */}
            <div className="flex flex-col gap-4 flex-1">
              {/* Chips arriba + título debajo */}
              <div className="rounded-lg bg-[#272727] p-4 border border-[rgba(60,60,60,0.7)]">
                <div className="flex items-center gap-2 mb-3">
                  {priorityChip && <Pill style={priorityChip.style}>{priorityChip.label}</Pill>}
                  {currentListName && <Pill style={{ backgroundColor: listBg, color: listText }}>{currentListName}</Pill>}
                </div>

                <input
                  className="bg-transparent text-xl font-semibold focus:outline-none placeholder-gray-400 w-full"
                  placeholder="Título de la tarjeta"
                  value={form.title}
                  onChange={(e) => handleFormChange("title", e.target.value)}
                />
              </div>

              {/* Descripción */}
              <div className="rounded-lg bg-[#272727] p-4 border border-[rgba(60,60,60,0.7)]">
                <label className="block mb-2 opacity-70">Descripción</label>
                <textarea
                  className="w-full h-[124px] bg-[#1f1f1f] rounded p-3 border border-[rgba(60,60,60,0.7)] focus:outline-none"
                  value={form.description}
                  onChange={(e) => handleFormChange("description", e.target.value)}
                  placeholder="Escribe aquí..."
                />
              </div>

              {/* Responsable / Miembros / Fecha */}
              <div className="rounded-lg bg-[#272727] p-4 border border-[rgba(60,60,60,0.7)]">
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <div className="text-sm opacity-70 mb-1">Responsable</div>
                    <div className="flex -space-x-2">
                      {(form.assignees || []).slice(0, 5).map((m: any) => (
                        <img key={m.id} src={m.img} alt={m.name} className="w-7 h-7 rounded-full border border-black" />
                      ))}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm opacity-70 mb-1">Miembros</div>
                    <div className="flex -space-x-2">
                      {(form.assignees || []).slice(0, 5).map((m: any) => (
                        <img key={`m-${m.id}`} src={m.img} alt={m.name} className="w-7 h-7 rounded-full border border-black" />
                      ))}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm opacity-70 mb-1">Fecha de tarjeta</div>
                    <input
                      type="date"
                      className="w-full bg-[#1f1f1f] rounded p-2 border border-[rgba(60,60,60,0.7)]"
                      value={form.endDate ? new Date(form.endDate).toISOString().slice(0, 10) : ""}
                      onChange={(e) =>
                        handleDateChange([
                          form.startDate ? new Date(form.startDate) : null,
                          e.target.value ? new Date(e.target.value) : null,
                        ])
                      }
                    />
                  </div>
                </div>
              </div>

              {/* Tabs */}
              <div className="flex items-center gap-2">
                <button className="w-[135px] h-[32px] rounded-[8px] bg-[#6A5FFF] px-2 text-sm">Detallada</button>
                <button className="w-[135px] h-[32px] rounded-[8px] bg-[#2b2b2b] border border-[rgba(60,60,60,0.7)] px-2 text-sm opacity-60 cursor-not-allowed">
                  Secciones
                </button>
              </div>

              {/* Subtareas (ARCODEADO, compact) */}
              <div className="rounded-lg bg-[#272727] p-4 border border-[rgba(60,60,60,0.7)]">
                <div className="mb-2 font-semibold">Subtareas</div>

                <div className="mb-3">
                  <div className="flex items-center justify-between text-sm opacity-80">
                    <span>
                      <b>{completed}</b> de <b>{subtasks.length}</b> completadas
                    </span>
                    <span>{progressPct}%</span>
                  </div>
                  <div className="mt-2 h-[6px] rounded bg-[#3A3A3A] overflow-hidden">
                    <div className="h-full bg-[#6A5FFF]" style={{ width: `${progressPct}%` }} />
                  </div>
                </div>

                <div className="mt-4">
                  <div className="grid grid-cols-[28px,1fr,220px,160px,120px] items-center text-sm opacity-70 pb-2 border-b border-[rgba(60,60,60,0.7)]">
                    <div />
                    <div>Descripción</div>
                    <div>Responsable</div>
                    <div>Fecha límite</div>
                    <div className="text-center">Acciones</div>
                  </div>

                  <div className="max-h-[210px] overflow-y-auto pr-1 mt-1">
                    {subtasks.map((t) => (
                      <div
                        key={t.id}
                        className="grid grid-cols-[28px,1fr,220px,160px,120px] items-center text-sm py-3 border-b border-[rgba(60,60,60,0.4)]"
                      >
                        <div>
                          <input
                            type="checkbox"
                            checked={t.done}
                            onChange={() =>
                              setSubtasks((prev) => prev.map((s) => (s.id === t.id ? { ...s, done: !s.done } : s)))
                            }
                            className="accent-[#6A5FFF] w-[16px] h-[16px]"
                          />
                        </div>
                        <div className={t.done ? "line-through opacity-60" : ""}>{t.title}</div>
                        <div className="opacity-80">{t.assignee}</div>
                        <div className="opacity-70">{t.due || "DD-MM-YYYY"}</div>
                        <div className="flex items-center justify-center gap-4">
                          <button className="opacity-80 hover:opacity-100" title="Editar" type="button">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M12 20h9" />
                              <path d="M16.5 3.5a2.121 2.121 0 1 1 3 3L7 19l-4 1 1-4 12.5-12.5z" />
                            </svg>
                          </button>
                          <button
                            className="opacity-80 hover:opacity-100"
                            title="Eliminar"
                            type="button"
                            onClick={() => setSubtasks((prev) => prev.filter((s) => s.id !== t.id))}
                          >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <polyline points="3 6 5 6 21 6" />
                              <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                              <path d="M10 11v6" />
                              <path d="M14 11v6" />
                              <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      setSubtasks((prev) => [
                        ...prev,
                        { id: Date.now(), title: "Nueva subtarea", assignee: "Iván Andrade", due: "DD-MM-YYYY", done: false },
                      ])
                    }
                    className="mt-3 w-full h-[36px] rounded-[8px] border border-[rgba(60,60,60,0.7)] hover:bg-[#2f2f2f] flex items-center justify-center gap-2"
                  >
                    <span className="text-lg leading-none">+</span> Agregar subtarea
                  </button>
                </div>
              </div>

              {/* Seguimiento (mock) */}
              <div className="rounded-lg bg-[#272727] p-4 border border-[rgba(60,60,60,0.7)]">
                <div className="mb-3 font-semibold">Seguimiento</div>
                <div className="grid grid-cols-3 gap-3">
                  <div className="h-[88px] rounded-lg border border-[rgba(60,60,60,0.7)] bg-[rgba(223,130,0,1)] p-4">
                    <div className="text-sm">Tiempo estimado</div>
                    <div className="text-2xl font-bold">40 horas</div>
                  </div>
                  <div className="h-[88px] rounded-lg border border-[rgba(60,60,60,0.7)] bg-[rgba(46,144,250,1)] p-4">
                    <div className="text-sm">Tiempo trabajado</div>
                    <div className="text-2xl font-bold">20 horas</div>
                  </div>
                  <div className="h-[88px] rounded-lg border border-[rgba(60,60,60,0.7)] bg-[rgba(167,0,0,1)] p-4">
                    <div className="text-sm">% Progreso</div>
                    <div className="text-2xl font-bold">33%</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Columna derecha – Comentarios (mock) */}
            <div className="w-[360px] max-w-[420px]">
              <CommentsPanel />
            </div>
          </div>

          {/* Botones al final */}
          <div className="mt-6 w-[1124px] max-w-full mx-auto flex justify-between">
            <button onClick={() => router.push(`/boardList/${boardId}`)} className="w-[332px] h-[37px] rounded-[8px] border border-[#6A5FFF] hover:opacity-80">
              Cancelar
            </button>
            <button onClick={handleSubmit as any} className="w-[332px] h-[37px] rounded-[8px] bg-[#6A5FFF] hover:bg-[#5A4FEF] text-white">
              Guardar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}