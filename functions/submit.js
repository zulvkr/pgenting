export async function onRequestPost({ request, env }) {
  try {
    let input = await request.formData();

    let fo = {
      name: "",
      wa: "",
      contact: "",
      message: "",
      status: "pesan terkirim"
    };

    input.forEach(function (value, key) {
      fo[key] = value;
    });

    let phone = fo.wa
    if (fo.wa[0] === '0') {
      phone = fo.wa.replace('0', '62')
    }
    const data = {
      phone,
      messageType: "text",
      body: `Dari: ${fo.name}\nKontak: ${fo.contact}\n\nPesan:\n${fo.message}\n\nvia pesangenting.com - HATI-HATI terhadap penipuan yang dapat dikirim melalui platform ini\n`,
    }

    fetch('https://sendtalk-api.taptalk.io/api/v1/message/send_whatsapp', {
      method: 'POST',
      headers: {
        'API-key': env.TAPTALK_API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }).then((response) => {
      if (response.status === 200) {
        return response.json();
      }
      else {
        throw new Error('Pesan genting offline');
      }
    })

    let pretty = JSON.stringify(fo, null, 2);
    
    return new Response(pretty, {
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      }
    })
  } catch (err) {
    return new Response(err.message, { status: 400 });
  }
}