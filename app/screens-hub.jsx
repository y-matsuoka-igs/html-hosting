// screens-hub.jsx — 受検ハブ(exam) / コンテンツ(contents)
const { useState: useShub } = React;

/* ════ 受検ハブ ════ */
function ExamHubScreen() {
  const nav = useNav();
  const s = nav.state;
  const items = [
    { key: 'diag',  title: '気質診断',  emoji: '🔍', desc: 'ゲームでキミのタイプを診断', done: s.diag.done,  go: 'start-diag', color: 'var(--blue)' },
    { key: 'self',  title: '自己評価',  emoji: '✏️', desc: '5つの質問で自分を評価', done: s.self.done,  go: 'self-eval', locked: !s.diag.done, color: '#00ACC1' },
    { key: 'other', title: '相互評価',  emoji: '💌', desc: 'みんなのことを評価しよう', done: s.other.done, go: 'other-eval', locked: !s.self.done, color: 'var(--orange)' },
  ];
  return (
    <div className="screen">
      <StatusBar />
      <AppHeader sub="受検" />
      <div className="scroll pad stack">
        <div>
          <h2 style={{ fontSize: 17, fontWeight: 900 }}>受検メニュー</h2>
          <p style={{ fontSize: 12, color: 'var(--text-sub)', marginTop: 4, fontWeight: 500 }}>3つのステップでトリセツが完成するよ 📖</p>
        </div>
        {items.map((it, i) => (
          <button key={it.key} onClick={() => !it.locked && nav.go(it.go)} disabled={it.locked}
            className="card" style={{ display: 'flex', alignItems: 'center', gap: 14, textAlign: 'left', border: 'none', cursor: it.locked ? 'default' : 'pointer', width: '100%', opacity: it.locked ? .55 : 1 }}>
            <div style={{ width: 50, height: 50, borderRadius: 15, flexShrink: 0, background: it.done ? 'var(--green-soft)' : `${it.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24 }}>
              {it.locked ? '🔒' : it.emoji}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                <span style={{ fontFamily: 'var(--font-round)', fontWeight: 800, fontSize: 15 }}>STEP {i + 1}・{it.title}</span>
                {it.done && <span className="pill" style={{ background: 'var(--green-soft)', color: '#2E7D32', fontSize: 10, padding: '3px 8px' }}>完了</span>}
              </div>
              <div style={{ fontSize: 11.5, color: 'var(--text-sub)', marginTop: 3, fontWeight: 500 }}>{it.locked ? '前のステップを完了すると解放' : it.desc}</div>
            </div>
            {!it.locked && <Icon name="chevR" size={18} />}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ════ コンテンツ ════ */
const BADGES = [
  { e: '🔍', l: '気質診断', need: 'diag' },
  { e: '✏️', l: '自己評価', need: 'self' },
  { e: '💌', l: '相互評価', need: 'other' },
  { e: '📖', l: 'トリセツ完成', need: 'all' },
  { e: '👣', l: '初めの一歩', need: 'step' },
  { e: '🌳', l: '成長の証', need: 'tree' },
];
function ContentsScreen() {
  const nav = useNav();
  const comp = completion(nav.state);
  const unlocked = comp >= 100;
  const got = (b) => b.need === 'diag' ? nav.state.diag.done : b.need === 'self' ? nav.state.self.done : b.need === 'other' ? nav.state.other.done : b.need === 'all' ? unlocked : false;

  return (
    <div className="screen">
      <StatusBar />
      <AppHeader sub="コンテンツ" />
      <div className="scroll pad stack">
        {!unlocked && (
          <div style={{ background: '#f0edea', borderRadius: 'var(--r-lg)', padding: '16px', display: 'flex', gap: 12, alignItems: 'center' }}>
            <div style={{ fontSize: 28 }}>🔒</div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 800, color: 'var(--text)' }}>もう少しで解放！</div>
              <div style={{ fontSize: 11, color: 'var(--text-sub)', marginTop: 2, lineHeight: 1.5 }}>トリセツが完成すると、占い・診断などが楽しめるよ（現在 {comp}%）</div>
            </div>
          </div>
        )}

        {/* お楽しみメニュー */}
        <h3 style={{ fontSize: 14, fontWeight: 800 }}>お楽しみコンテンツ</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          {[
            ['🔮', '今日の占い', '#8a6cf0', '#EDE7F6', 'fortune'],
            ['🎯', '今月の診断', '#0096fa', '#E0F7FA', 'monthly'],
            ['🎁', 'スペシャル', '#FC8524', '#fff3e0', null],
            ['📊', '成長レポート', '#00c853', '#e4f9ec', null],
          ].map(([e, l, c, bg, screen]) => (
            <div key={l} onClick={() => unlocked && screen && nav.go(screen)}
              style={{ background: '#fff', borderRadius: 'var(--r-lg)', padding: '18px 14px', textAlign: 'center', boxShadow: 'var(--shadow-sm)', opacity: unlocked ? 1 : .5, position: 'relative', cursor: unlocked && screen ? 'pointer' : 'default' }}>
              {!unlocked && <div style={{ position: 'absolute', top: 8, right: 8, fontSize: 13 }}>🔒</div>}
              <div style={{ width: 46, height: 46, borderRadius: 14, margin: '0 auto 8px', background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24 }}>{e}</div>
              <div style={{ fontFamily: 'var(--font-round)', fontWeight: 700, fontSize: 12.5 }}>{l}</div>
            </div>
          ))}
        </div>

        {/* バッジ */}
        <h3 style={{ fontSize: 14, fontWeight: 800, marginTop: 2 }}>獲得バッジ</h3>
        <div className="card">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 14 }}>
            {BADGES.map((b, i) => {
              const has = got(b);
              return (
                <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, opacity: has ? 1 : .35 }}>
                  <div style={{ width: 54, height: 54, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26, background: has ? 'linear-gradient(135deg,#fff3e0,#ffe0b2)' : 'var(--bg)', border: has ? '2px solid var(--orange)' : '2px dashed var(--border)' }}>
                    {has ? b.e : '？'}
                  </div>
                  <span style={{ fontSize: 10, fontWeight: 700, color: has ? 'var(--text)' : 'var(--text-sub)', textAlign: 'center' }}>{b.l}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ════ 受検準備中 ════ */
function ExamWaitingScreen() {
  const nav = useNav();
  return (
    <div className="screen">
      <StatusBar />
      {/* 青ヘッダー */}
      <div style={{ background: 'var(--blue)', flexShrink: 0, padding: '24px 24px 32px', textAlign: 'center', color: '#fff' }}>
        {/* クリップボード＋時計アイコン */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 16 }}>
          <div style={{ position: 'relative', width: 72, height: 72 }}>
            <svg width="72" height="72" viewBox="0 0 72 72" fill="none">
              <rect x="12" y="8" width="48" height="56" rx="8" fill="none" stroke="white" strokeWidth="3.5"/>
              <path d="M24 8v-2a4 4 0 0 1 8 0v2M40 8v-2a4 4 0 0 1 8 0v2" stroke="white" strokeWidth="3"/>
              <rect x="20" y="6" width="32" height="8" rx="4" fill="white" opacity=".25"/>
              <line x1="24" y1="30" x2="48" y2="30" stroke="white" strokeWidth="3" strokeLinecap="round"/>
              <line x1="24" y1="40" x2="40" y2="40" stroke="white" strokeWidth="3" strokeLinecap="round"/>
              <circle cx="54" cy="54" r="14" fill="var(--blue)" stroke="white" strokeWidth="3"/>
              <path d="M54 48v7l4 3" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, opacity: .8, marginBottom: 8 }}>NEXT SESSION</div>
        <h1 style={{ fontFamily: 'var(--font-round)', fontSize: 24, fontWeight: 900, lineHeight: 1.4, marginBottom: 10 }}>
          次のAi GROW受検は<br/>準備中です
        </h1>
        <p style={{ fontSize: 13, opacity: .85, lineHeight: 1.7, fontWeight: 500 }}>
          次回の受検案内が届くまで、<br/>今の強みを活かして前へ進もう！
        </p>
      </div>

      <div className="scroll pad stack">
        {/* それまでにできること */}
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
            <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'var(--blue-soft)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--blue)" strokeWidth="2.2" strokeLinecap="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2.5"/></svg>
            </div>
            <span style={{ fontFamily: 'var(--font-round)', fontWeight: 800, fontSize: 15 }}>それまでにできること</span>
          </div>
          <ul style={{ listStyle: 'disc', paddingLeft: 18, display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              ['チャレンジでコンピテンシーを高める行動をする', () => nav.go('next-step')],
              ['トリセツを読み返して自分の強みを活かす場面を探す', () => nav.go('home')],
              ['AIに相談してキミの伸ばし方を深掘りする', () => nav.go('ai-chat')],
              ['コンテンツで気分転換・自己理解を深める', () => nav.go('contents')],
            ].map(([text, onClick]) => (
              <li key={text} style={{ fontSize: 13.5, color: 'var(--text)', fontWeight: 500, lineHeight: 1.6, cursor: 'pointer' }} onClick={onClick}>
                {text}
              </li>
            ))}
          </ul>
        </div>

        {/* 次回受検の目安 */}
        <div>
          <div style={{ fontSize: 13, fontWeight: 800, color: 'var(--text)', marginBottom: 8 }}>次回受検の目安</div>
          <div style={{ background: 'var(--bg)', borderRadius: 'var(--r-md)', padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 12 }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--text-sub)" strokeWidth="2" strokeLinecap="round"><rect x="3" y="4" width="18" height="18" rx="3"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
            <span style={{ fontSize: 13, color: 'var(--text-sub)', fontWeight: 600 }}>学校・担当者からの案内をお待ちください</span>
          </div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { ExamHubScreen, ContentsScreen, ExamWaitingScreen });

/* ════ 今日の占い ════ */
function FortuneScreen() {
  const nav = useNav();
  const items = [
    { e: '🎨', title: 'ラッキーカラー：イエロー', body: '明るい色を身に着けて気分をあげよう！' },
    { e: '🍩', title: 'ラッキーフード：ドーナツ', body: '丸い形で人とのつながり運アップ！' },
    { e: '📖', title: 'ラッキー教科：国語', body: '自分の考えを言葉にするといいことあるかも！' },
    { e: '💬', title: '今日のひとこと：「それいいね！」', body: '誰かの、何かのいい所を見つけて言葉にしてみよう' },
    { e: '✨', title: '今日のおすすめ行動', body: 'あまり話したことがない友だちに話しかけてみよう。新しい視点が得られるかも！' },
  ];
  return (
    <div className="screen">
      <StatusBar />
      <div className="appbar">
        <button onClick={() => nav.go('contents')} style={{ border: 'none', background: 'var(--bg)', width: 38, height: 38, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'var(--text)' }}>
          <Icon name="back" size={20} />
        </button>
        <div className="logo"><span className="ai">Ai</span><span className="grow">GROW</span></div>
        <div style={{ width: 38 }}></div>
      </div>
      <div className="scroll pad stack">
        {/* ヒーロー */}
        <div style={{ background: 'linear-gradient(135deg,#2C1654,#6A3093)', borderRadius: 'var(--r-lg)', padding: '22px 20px', color: '#fff', textAlign: 'center' }}>
          <div style={{ fontSize: 11, letterSpacing: 2, opacity: .75, fontWeight: 700, marginBottom: 8 }}>今日の占い</div>
          <div style={{ fontSize: 13.5, opacity: .9, marginBottom: 10, lineHeight: 1.6 }}>周りを明るくするアイデアメーカータイプの<br/>キミの今日の運勢は…</div>
          <div style={{ fontSize: 28, letterSpacing: 4, marginBottom: 8 }}>★★★★☆</div>
          <div style={{ fontSize: 14, fontFamily: 'var(--font-round)', fontWeight: 800, lineHeight: 1.55 }}>アイデアがポンポン出てくる日。<br/>ちょっとしたひとことで、場の空気を変えられそう！</div>
        </div>
        {/* アイテム一覧 */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {items.map((it, i) => (
            <div key={i} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
              <div style={{ width: 40, height: 40, borderRadius: 12, background: '#EDE7F6', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>{it.e}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 800, color: 'var(--text)', marginBottom: 2 }}>{it.title}</div>
                <div style={{ fontSize: 12, color: 'var(--text-sub)', lineHeight: 1.6, fontWeight: 500 }}>{it.body}</div>
              </div>
            </div>
          ))}
        </div>
        {/* コンテンツナビ */}
        <div>
          <div style={{ fontSize: 11, color: 'var(--text-sub)', fontWeight: 700, marginBottom: 8 }}>コンテンツを見る</div>
          <div style={{ display: 'flex', gap: 8 }}>
            {[['🔮', '今日の占い', '#EDE7F6', null], ['🎯', '今月の診断', '#E0F7FA', 'monthly']].map(([e, l, bg, s]) => (
              <button key={l} onClick={() => s && nav.go(s)} disabled={!s}
                style={{ flex: 1, background: bg, border: 'none', borderRadius: 12, padding: '10px 6px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5, cursor: s ? 'pointer' : 'default', opacity: s ? 1 : .45 }}>
                <span style={{ fontSize: 22 }}>{e}</span>
                <span style={{ fontSize: 10, fontWeight: 700, color: 'var(--text)', textAlign: 'center' }}>{l}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ════ 今月の診断 ════ */
function MonthlyScreen() {
  const nav = useNav();
  const others = ['🎸', '🥁', '🎹', '🎷', '🎻'];
  return (
    <div className="screen">
      <StatusBar />
      <div className="appbar">
        <button onClick={() => nav.go('contents')} style={{ border: 'none', background: 'var(--bg)', width: 38, height: 38, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'var(--text)' }}>
          <Icon name="back" size={20} />
        </button>
        <div className="logo"><span className="ai">Ai</span><span className="grow">GROW</span></div>
        <div style={{ width: 38 }}></div>
      </div>
      <div className="scroll pad stack">
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: '#00838F', marginBottom: 4 }}>今月の診断</div>
          <div style={{ fontSize: 15, fontWeight: 800, color: 'var(--text)', marginBottom: 2 }}>あなたはどの楽器？楽器診断</div>
          <div style={{ fontSize: 13, color: 'var(--text-sub)' }}>あなたは…</div>
        </div>
        {/* 楽器サークル */}
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div style={{ width: 110, height: 110, borderRadius: '50%', background: 'linear-gradient(135deg,#E0F7FA,#B2EBF2)', border: '3px solid #00838F', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 56, boxShadow: '0 8px 24px rgba(0,131,143,.2)' }}>🎺</div>
        </div>
        <div style={{ textAlign: 'center', fontFamily: 'var(--font-round)', fontSize: 19, fontWeight: 900, color: 'var(--text)' }}>トランペットタイプ！</div>
        <div className="card">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 13.5, color: 'var(--text)', marginBottom: 10, fontWeight: 500 }}>
            <span>・明るくてエネルギーがある</span>
            <span>・ここぞというときに前に出られる</span>
            <span>・まわりの空気を動かす力がある</span>
          </div>
          <div style={{ fontSize: 12.5, color: 'var(--orange)', fontWeight: 700 }}>🎵「場を引っ張るスイッチ」を持っているタイプ</div>
        </div>
        {/* 他のタイプ */}
        <div>
          <div style={{ fontSize: 12, color: 'var(--text-sub)', marginBottom: 8, textAlign: 'center' }}>他のタイプを見る</div>
          <div style={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
            {others.map((e, i) => (
              <div key={i} style={{ width: 48, height: 48, borderRadius: '50%', background: '#f5f6f8', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, border: '1.5px solid var(--border)', cursor: 'pointer' }}>{e}</div>
            ))}
          </div>
          <div style={{ fontSize: 11, color: 'var(--text-sub)', textAlign: 'center', marginTop: 8, lineHeight: 1.6 }}>毎月替わる：お弁当のおかず・動物・スイーツ・RPGキャラ・偉人 など</div>
        </div>
        {/* コンテンツナビ */}
        <div>
          <div style={{ fontSize: 11, color: 'var(--text-sub)', fontWeight: 700, marginBottom: 8 }}>コンテンツを見る</div>
          <div style={{ display: 'flex', gap: 8 }}>
            {[['🔮', '今日の占い', '#EDE7F6', 'fortune'], ['🎯', '今月の診断', '#E0F7FA', null]].map(([e, l, bg, s]) => (
              <button key={l} onClick={() => s && nav.go(s)} disabled={!s}
                style={{ flex: 1, background: bg, border: 'none', borderRadius: 12, padding: '10px 6px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5, cursor: s ? 'pointer' : 'default', opacity: s ? 1 : .45 }}>
                <span style={{ fontSize: 22 }}>{e}</span>
                <span style={{ fontSize: 10, fontWeight: 700, color: 'var(--text)', textAlign: 'center' }}>{l}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { FortuneScreen, MonthlyScreen });
