// Gerekli elementler alınır
const input = document.getElementById('chat-input');
const sendBtn = document.getElementById('chat-send');
const messages = document.getElementById('chat-messages');

// Butona tıklanırsa veya Enter'a basılırsa mesaj gönderilir
sendBtn.addEventListener('click', sendMessage);
input.addEventListener('keydown', function(e) {
  if (e.key === 'Enter') sendMessage();
});

// Mesaj gönderme fonksiyonu
function sendMessage() {
  const userText = input.value.trim();
  if (!userText) return;

  appendMessage('Sen', userText); // Kullanıcı mesajı
  input.value = '';

  setTimeout(() => {
    const reply = freudResponse(userText); // Cevap hazırlanır
    appendMessage('Freud', reply); // Cevap gösterilir
  }, 500);
}

// Mesajları ekrana yazdırır
function appendMessage(sender, text) {
  const msgDiv = document.createElement('div');
  msgDiv.className = 'message';
  msgDiv.innerHTML = `<strong>${sender}:</strong> ${text}`;
  messages.appendChild(msgDiv);
  messages.scrollTop = messages.scrollHeight;
}

// Gelen mesaja göre cevap üretir
function freudResponse(text) {
  const t = text.toLowerCase();

  // Hastalıklarla ilgili bilgiler
  const hastaliklar = {
    "depresyon": "Depresyon, sürekli üzgün hissetme ve ilgi kaybı ile karakterizedir.",
    "bipolar bozukluk": "Bipolar bozukluk, aşırı ruh hali değişimleriyle seyreden bir rahatsızlıktır.",
    "şizofreni": "Şizofreni, gerçeklikten kopmaya neden olan ciddi bir zihinsel hastalıktır.",
    "okb": "OKB, takıntılı düşünceler ve tekrarlayan davranışlarla karakterizedir.",
    "panik bozukluk": "Panik bozukluk, aniden gelen yoğun korku ataklarıyla ortaya çıkar.",
    "travma sonrası stres bozukluğu": "TSSB, travmatik olaylardan sonra gelişen bir kaygı bozukluğudur.",
    "yaygın anksiyete bozukluğu": "YAB, sürekli ve aşırı endişe duyma haliyle karakterizedir.",
    "sosyal anksiyete bozukluğu": "Sosyal fobi, sosyal ortamlarda yoğun kaygı ve utanç hissetmeye neden olur.",
    "somatizasyon bozukluğu": "Fiziksel bir neden olmaksızın bedensel şikayetlerle kendini gösterir.",
    "dissosiyatif kimlik bozukluğu": "Bu bozuklukta kişi birden fazla kimliğe sahipmiş gibi hisseder.",
    "borderline kişilik bozukluğu": "Borderline, duygusal dalgalanmalar ve ilişki sorunlarıyla tanınır.",
    "distimik bozukluk": "Distimi, kronik ama daha hafif şiddette bir depresyon türüdür."
  };

  for (const hastalik in hastaliklar) {
    if (t.includes(hastalik)) {
      const info = hastaliklar[hastalik];
      return `${info} <br><button class="redirect-btn" onclick="window.location.href='hastalik.html'">Detaylı Bilgi</button>`;
    }
  }

  // Belirli kelimelere göre duygu analizi
  const keywords = {
    selam:["selam","merhaba","freud","hey","beni dinler misin"],
    yalnızlık: ["yalnız", "yalnızlık", "kimsem yok", "tek başıma"],
    stres: ["stres", "gergin", "bunaldım", "boğuluyorum"],
    kaygı: ["endişe", "kaygı", "korkuyorum", "geriliyorum"],
    mutsuzluk: ["mutsuzum", "üzgünüm", "depresyondayım", "hiçbir şey istemiyorum"],
    öfke: ["sinirliyim", "kızgınım", "öfkeliyim", "patlamak üzereyim"],
    mutluluk: ["mutluyum", "sevinçliyim", "iyi hissediyorum", "keyfim yerinde"]
  };

  for (const [duygu, kelimeler] of Object.entries(keywords)) {
    for (const k of kelimeler) {
      if (t.includes(k)) {
        return duyguyaCevapVer(duygu); // Uygun cevap döndürülür
      }
    }
  }

  return "Bunu daha iyi anlayabilmem için biraz daha detay verebilir misin?";
}

// Her duygu için rastgele bir cevap döndürür
function duyguyaCevapVer(duygu) {
  const cevaplar = {
    selam: [
      "Merhaba ben Freud, her zaman seni dinlemek için buradayım. Bugün nasıl hissediyorsun?",
      "Selam! Yorucu bir gün mü geçiriyorsun? Freud burada, anlat bakalım."
    ],
    yalnızlık: [
      "Yalnızlık zorlayıcı olabilir, bu duygu ne zamandır seninle?",
      "Seni dinliyorum, yalnızlık hissini biraz daha açar mısın?"
    ],
    stres: [
      "Stres seni nasıl etkiliyor? Günlük hayatında bununla nasıl baş ediyorsun?",
      "Bu stres kaynağı hakkında konuşmak ister misin?"
    ],
    kaygı: [
      "Kaygılar bazen düşüncelerimizi ele geçirebilir. Neden kaygılandığını birlikte inceleyelim mi?",
      "Kaygı duymanı tetikleyen özel bir durum var mı?"
    ],
    mutsuzluk: [
      "Mutsuzluk uzun süredir mi var? Birlikte bu duyguyu anlamaya çalışabiliriz.",
      "Hayatında sana keyif veren şeyler var mı şu sıralar?"
    ],
    öfke: [
      "Öfke çok güçlü bir duygudur. Ne oldu da böyle hissettin?",
      "Bu duyguyu nasıl yönetmeye çalışıyorsun?"
    ],
    mutluluk: [
      "Bunu duymak harika! Neler seni mutlu ediyor, biraz paylaşmak ister misin?",
      "Mutluluğunu sürdürebilmek için neler yapıyorsun?"
    ]
  };

  const secenekler = cevaplar[duygu];
  return secenekler[Math.floor(Math.random() * secenekler.length)];
}
