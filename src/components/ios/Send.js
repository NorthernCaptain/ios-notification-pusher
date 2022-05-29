import apn from 'node-apn';
import {ValidateError} from "../Exceptions";
import sha1 from 'js-sha1'
import {midEllipsis} from "../../utils";

const apnCache = {}

function validateEvent(event) {
  if(event.auth.type === 0) {
    if(!event.auth.certFile || !event.auth.certFile.path){
      throw new ValidateError('certFile', 'CertFile is required')
    }
    if(!event.auth.passphrase) {
      throw new ValidateError('passphrase', 'Passphrase is required')
    }
  } else {
    if(!event.auth.keyFile || !event.auth.keyFile.path){
      throw new ValidateError('keyFile', 'KeyFile is required')
    }
    if(!event.auth.teamId) {
      throw new ValidateError('teamId', 'Team Id is required')
    }
    if(!event.auth.keyId) {
      throw new ValidateError('keyId', 'Key Id is required')
    }
  }
}

function constructOptions(event) {
  return event.auth.type === 0 ? {
    pfx: event.auth.certFile.path,
    production: event.env.production,
    passphrase: event.auth.passphrase
  } : {
    key: event.auth.keyFile.path,
    production: event.env.production,
    teamId: event.auth.teamId,
    keyId: event.auth.keyId
  }
}

export default async function sendEvent(event) {
  validateEvent(event)

  const jsonCode = JSON.parse(event.body.code)

  const options = constructOptions(event)
  const hash = sha1(JSON.stringify(Object.values(options).sort()))
  let apnProvider = apnCache[hash]
  if(!apnProvider) {
    apnProvider = new apn.Provider(options)
    apnCache[hash] = apnProvider
  }

  const notification = new apn.Notification();

  notification.topic = event.body.bundleId
  notification.expiry = event.header.expiry ? event.header.expiry : 0
  notification.priority = event.header.priority
  notification.pushType = event.header.pushType
  if(event.header.collapseId) {
    notification.collapseId = event.header.collapseId
  }

  notification.rawPayload = jsonCode

  let res = await apnProvider.send(notification, event.body.devices)
  let ret = []
  for(let entry of res.sent) {
    ret.push({
      severity: "success",
      message: `Successfully sent event to device ${midEllipsis(entry.device)}`
    })
  }
  for(let entry of res.failed) {
    const err = entry.response?.reason
    ret.push({
      severity: "error",
      message: `Failed to send event to device ${midEllipsis(entry.device)}`,
      error: err
    })
  }
  res.logs = ret;
  return res
}
