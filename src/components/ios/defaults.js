
export const eventBody = { code: `{
  "aps": {
    "alert": {
      "title": "Message title",
      "subtitle": "Short message subtitle",
      "body": "This is the body text of your message"
    }
    "mutable-content": 0
  }
}
`,
  devices: [],
  bundleId: ''
}

export const eventHeader = { pushType: 'alert', priority: '10', collapseId: '', id: '', expiry: null }

export const eventAuth = { type: 0, passphrase: '', keyId: '', teamId: ''}

export const eventEnv = {production: false}
