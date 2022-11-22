export async function onRequestPost({ request }) {
  try {
    let input = await request.formData();

    let tmp, output = {
      status: "pesan terkirim"
    };
    for (let [key, value] of input) {
      tmp = output[key];
      if (tmp === undefined) {
        output[key] = value;
      } else {
        output[key] = [].concat(tmp, value);
      }
    }

    let pretty = JSON.stringify(output, null, 2);
    return new Response(pretty, {
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      }
    });
  } catch (err) {
    return new Response('Error parsing JSON content', { status: 400 });
  }
}