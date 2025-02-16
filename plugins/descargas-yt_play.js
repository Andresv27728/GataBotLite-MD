import { youtubedl, youtubedlv2 } from '@bochilteam/scraper'
import fetch from 'node-fetch'
import yts from 'yt-search'
import ytdl from 'ytdl-core'
import axios from 'axios'
let tempStorage = {}

const handler = async (m, {conn, command, args, text, usedPrefix}) => {
if (!text) return m.reply(lenguajeGB.smsMalused2() + `*${usedPrefix + command} Billie Eilish - Bellyache*`)
const yt_play = await search(args.join(' '))
const ytplay2 = await yts(text)
let caption = `*◜⋯ ⋯ ⋯ Y O U T U B E ⋯ ⋯ ⋯◞*
*◎ ${lenguajeGB.smsYT1()}*
${yt_play[0].title}

*◎ ${lenguajeGB.smsYT3()}*
${secondString(yt_play[0].duration.seconds)}

*◎ ${lenguajeGB.smsYT4()}*
${MilesNumber(yt_play[0].views)}

*◎ URL*
${yt_play[0].url}
*◜⋯ ⋯ ⋯ ${gt} ⋯ ⋯ ⋯◞*

*_Para seleccionar, reacciona o escribe respondiendo a este mensaje:_*
> "❤️" o "audio" → *Audio*
> "👍" o "video" → *Video*
> "🙏" o "audiodoc" → *Audio (doc)*
> "😮" o "videodoc" → *Video (doc)*`
tempStorage[m.sender] = { url: yt_play[0].url, title: yt_play[0].title, resp: m }

await conn.sendMessage(m.chat, {text: caption, contextInfo: { externalAdReply: { title: wm, body: wait2.replace(/\*/g, ''), thumbnailUrl: yt_play[0].thumbnail, sourceUrl: md, mediaType: 1, showAdAttribution: false, renderLargerThumbnail: true }}});
}

handler.before = async (m, { conn }) => {
const text = m.text.trim().toLowerCase()
if (!['❤️', 'audio', '👍', 'video', '🙏', 'audiodoc', '😮', 'videodoc'].includes(text)) return
const userVideoData = tempStorage[m.sender]
const gata = tempStorage[m.sender]
if (!userVideoData || !userVideoData.url) return
  
const optionsAudio = {
"❤️": "audio",
"audio": "audio",
"🙏": "document",
"audiodoc": "document"
}
const typeAudio = optionsAudio[text]

const optionsVideo = {
"👍": { type: "video", caption: true },
"video": { type: "video", caption: true },
"😮": { type: "document", caption: false },
"videodoc": { type: "document", caption: false }
}
const typeVideo = optionsVideo[text]
  
try {
if ((typeAudio === "audio" || typeAudio === "document") && ['❤️', '🙏', 'audio', 'audiodoc'].includes(text)) {
if (typeAudio === "audio") {
await conn.reply(m.chat, lenguajeGB.smsAvisoEG() + `*${lenguajeGB.smsYTA1()}*`, fkontak, m || null)
} else if (typeAudio === "document") {
await conn.reply(m.chat, lenguajeGB.smsAvisoEG() + `*${lenguajeGB.smsYTA2()}*`, fkontak, m || null)
}
try {
const response = await fetch(APIs.ryzendesu.url + `downloader/ytmp3?url=${userVideoData.url}`)
const json = await response.json()
await conn.sendMessage(m.chat, { [typeAudio]: { url: json.url }, mimetype: 'audio/mpeg', fileName: json.filename }, { quoted: gata.resp })
} catch {   
try {
const response = await fetch(APIs.delirius.url + `download/ytmp3?url=${userVideoData.url}`)
const json = await response.json()
await conn.sendMessage(m.chat, { [typeAudio]: { url: json.data.download.url }, mimetype: 'audio/mpeg', fileName: json.data.download.filename }, { quoted: gata.resp })
} catch {
try {
const res = await fetch(APIs.vreden.url + `ytmp3?url=${userVideoData.url}`);
const { result } = await res.json()
await conn.sendMessage(m.chat, { [typeAudio]: { url: result.download.url }, mimetype: 'audio/mpeg', fileName: result.download.filename }, { quoted: gata.resp })
} catch {   
try {   
const response = await fetch(APIs.exonity.url + `dl/ytmp3?url=${userVideoData.url}&apikey=${APIs.exonity.key}`)
const json = await response.json()
await conn.sendMessage(m.chat, { [typeAudio]: { url: json.result.dl }, mimetype: 'audio/mpeg', fileName: json.result.title + '.mp3' }, { quoted: gata.resp })
} catch {
try {
const res = await fetch(APIs.siputzx.url + `d/ytmp3?url=${userVideoData.url}`)
let { data } = await res.json();
await conn.sendMessage(m.chat, { [typeAudio]: { url: data.dl }, mimetype: 'audio/mpeg' }, { quoted: gata.resp })
} catch {
try {   
const response = await fetch(APIs.alyachan.url + `yta?url=${userVideoData.url}&apikey=${APIs.alyachan.key}`)
const json = await response.json()
await conn.sendMessage(m.chat, { [typeAudio]: { url: json.data.url }, mimetype: 'audio/mpeg', fileName: json.data.filename }, { quoted: gata.resp })
} catch { 
await conn.sendMessage(m.chat, { text: "Error al descargar el Audio" }, { quoted: gata.resp })
}}}}}}
  
} else if ((typeVideo.type === "video" || typeVideo.type === "document") && ['👍', '😮', 'video', 'videodoc'].includes(text)) {
await conn.reply(m.chat, lenguajeGB.smsAvisoEG() + `*${typeVideo.type === "video" ? lenguajeGB.smsYTV1() : lenguajeGB.smsYTV2()}*`, fkontak, m || null)
try {
const response = await fetch(APIs.delirius.url + `download/ytmp4?url=${userVideoData.url}`)
const json = await response.json()
console.log(json)
let caption = `🎬 *${json.data.title}*\n📺 *Canal:* ${json.data.author}\n📁 *Calidad:* ${json.data.download.quality}\n📦 *Tamaño:* ${json.data.download.size}`
//let buff = await conn.getFile(json.data.download.url)
let url = await fetch(json.data.download.url, { method: 'HEAD' }).then(response => response.url)
console.log(url)
conn.sendFile(m.chat, 'https://rr4---sn-vgqsknsk.googlevideo.com/videoplayback?expire=1739685805&ei=TSuxZ_iFJ6GX2_gPh4HwsAM&ip=2601%3A249%3A8700%3A1086%3A6984%3Ae0ac%3Ae691%3Aaf89&id=o-AN_-g2cNb3kXszdgVmQ0fXtXcWHJmzjcR7maNz_4FWCi&itag=18&source=youtube&requiressl=yes&xpc=EgVo2aDSNQ%3D%3D&gcr=us&bui=AUWDL3w_2aB9enDjVprYMAJRmM29niqsR3yd2Ez9FOp9B7VWSZ5Q_ZyiocuchGAxdtXeZR0WXaPr-PZA&spc=RjZbSf2Fvpa4LZHpRfWEfyQm7UxEB-Nna5mJ-75q1W-3G-AZKMa66cgzhk-icztMUsjr&vprv=1&svpuc=1&xtags=heaudio%3Dtrue&mime=video%2Fmp4&ns=LGw3n1n3HUKz46z4b9bKeY8Q&rqh=1&cnr=14&ratebypass=yes&dur=274.645&lmt=1705811094659095&lmw=1&fexp=24350590,24350737,24350827,24350961,24350977,24350978,24351082,24351093,24351129,24351132,24351184,24351202,51326932&c=TVHTML5&sefc=1&txp=4538434&n=cgnvuiSXRYTsAA&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cxpc%2Cgcr%2Cbui%2Cspc%2Cvprv%2Csvpuc%2Cxtags%2Cmime%2Cns%2Crqh%2Ccnr%2Cratebypass%2Cdur%2Clmt&sig=AJfQdSswRAIgFv77x38iKzClsGgg8eQINmvg-UTAI9Rq76JynB_QF6YCICervzFwjh5YyL-6jU7wX5IpbCM019_9qAlxaOd4QMtO&from_cache=True&rm=sn-vgqesr7z&rrc=104,80&req_id=f1cd6c175d0aa3ee&ipbypass=yes&redirect_counter=2&cm2rm=sn-3jpm-hjpe7e&cms_redirect=yes&cmsv=e&met=1739666169,&mh=dq&mip=173.208.192.170&mm=29&mn=sn-vgqsknsk&ms=rdu&mt=1739665454&mv=u&mvi=4&pl=17&rms=rdu,au&lsparams=ipbypass,met,mh,mip,mm,mn,ms,mv,mvi,pl,rms&lsig=AGluJ3MwRQIgYPS6j2rPNxVzdrqBuvFJkMKNRZdrentRsvJbJRIKPO4CIQDZhUxD-IbN5pqT3HGGsPQG3ZEPW4q5StSvpJvh54x6kw%3D%3D', json.data.download.filename, caption, gata.resp)
//await conn.sendMessage(m.chat, { [typeVideo.type]: { url: json.data.download.url }, mimetype: 'video/mp4', fileName: json.data.download.filename, ...(typeVideo.caption && { caption: caption }) }, { quoted: gata.resp })
  
//} catch {
//try {
//const response = await fetch(APIs.alyachan.url + `ytv?url=${userVideoData.url}&apikey=${APIs.alyachan.key}`)
//const json = await response.json()
//let caption = `🎬 *${json.title}*\n📺 *Canal:* ${json.channel}\n📁 *Calidad:* ${json.data.quality}\n📦 *Tamaño:* ${json.data.size}`
//await conn.sendMessage(m.chat, { [typeVideo.type]: { url: json.data.url }, mimetype: 'video/mp4', fileName: json.data.filename, ...(typeVideo.caption && { caption: caption }) }, { quoted: gata.resp })
} catch {
try {
const response = await fetch(APIs.ryzendesu.url + `downloader/ytmp4?url=${userVideoData.url}&quality=720`)
const json = await response.json()
let caption = `🎬 *${json.title}*\n📺 *Canal:* ${json.authorUrl}\n📁 *Calidad:* 720p\n📦 *Tamaño:* ${await getFileSize(json.url)}`
await conn.sendMessage(m.chat, { [typeVideo.type]: { url: json.url }, mimetype: 'video/mp4', fileName: json.filename, ...(typeVideo.caption && { caption: caption }) }, { quoted: gata.resp })
/*try {   
const axeelUrl = `https://axeel.my.id/api/download/audio?url=${userVideoData.url}`;
const axeelResponse = await fetch(axeelUrl);
const axeelData = await axeelResponse.json();
if (!axeelData || !axeelData.downloads?.url) throw new Error();
await conn.sendFile(m.chat, axeelData.downloads.url, 'error.mp4', `${gt}`, gata.resp)
} catch {
try {   
const ryzenUrl = `https://api.ryzendesu.vip/api/downloader/ytmp3?url=${userVideoData.url}`;
const ryzenResponse = await fetch(ryzenUrl);
const ryzenData = await ryzenResponse.json();
if (ryzenData.status === 'tunnel' && ryzenData.url) {
const downloadUrl = ryzenData.url;
await conn.sendFile(m.chat, downloadUrl, 'error.mp4', `${gt}`, gata.resp)
}       
} catch {*/
} catch {
try {   
//let d2 = await fetch(`https://exonity.tech/api/ytdlp2-faster?apikey=adminsepuh&url=${userVideoData.url}`);
//let dp = await d2.json();
//const audiop = await getBuffer(dp.result.media.mp3);
//const fileSize = await getFileSize(dp.result.media.mp3);
//await conn.sendFile(m.chat, audiop, 'error.mp4', `${gt}`, gata.resp)
} catch (error) {
console.log(error)
}}}//}//}}
}
} catch (error) {
console.error(error);
} finally {
delete tempStorage[m.sender]
}
  
}
handler.command = /^(play|play2)$/i
handler.register = true 
export default handler

async function search(query, options = {}) {
const search = await yts.search({query, hl: 'es', gl: 'ES', ...options})
return search.videos
}

function secondString(seconds) {
seconds = Number(seconds)
const d = Math.floor(seconds / (3600 * 24))
const h = Math.floor((seconds % (3600 * 24)) / 3600)
const m = Math.floor((seconds % 3600) / 60)
const s = Math.floor(seconds % 60)
const dDisplay = d > 0 ? d + (d == 1 ? ' día, ' : ' días, ') : ''
const hDisplay = h > 0 ? h + (h == 1 ? ' hora, ' : ' horas, ') : ''
const mDisplay = m > 0 ? m + (m == 1 ? ' minuto, ' : ' minutos, ') : ''
const sDisplay = s > 0 ? s + (s == 1 ? ' segundo' : ' segundos') : ''
return dDisplay + hDisplay + mDisplay + sDisplay
}

function MilesNumber(number) {
const exp = /(\d)(?=(\d{3})+(?!\d))/g;
const rep = '$1.';
const arr = number.toString().split('.');
arr[0] = arr[0].replace(exp, rep);
return arr[1] ? arr.join('.') : arr[0];
}

async function getFileSize(url) {
try {
const response = await fetch(url, { method: 'HEAD' })
const contentLength = response.headers.get('content-length')
if (!contentLength) return "Tamaño no disponible"
const sizeInBytes = parseInt(contentLength, 10);
return await formatSize(sizeInBytes)
} catch (error) {
console.error("Error al obtener el tamaño del archivo:", error)
return "Error al obtener el tamaño"
}}

async function formatSize(bytes) {
if (bytes >= 1e9) {
return (bytes / 1e9).toFixed(2) + " GB"
} else if (bytes >= 1e6) {
return (bytes / 1e6).toFixed(2) + " MB"
} else {
return bytes + " bytes"
}}

async function fetchInvidious(url) {
const apiUrl = `https://invidious.io/api/v1/get_video_info`
const response = await fetch(`${apiUrl}?url=${encodeURIComponent(url)}`)
const data = await response.json()
if (data && data.video) {
const videoInfo = data.video
return videoInfo
} else {
throw new Error("No se pudo obtener información del video desde Invidious")
}}
