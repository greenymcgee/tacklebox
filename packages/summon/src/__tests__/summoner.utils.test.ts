import { mergeHeaders } from '../summoner.utils'

describe('mergeHeaders', () => {
  it('should set each entry from toBeMerged onto headers', () => {
    const headers = new Headers()
    const toBeMerged = { Authorization: 'Bearer token' }
    mergeHeaders({ headers, toBeMerged })
    expect(headers.get('Authorization')).toBe('Bearer token')
  })

  it('should skip entries whose value is undefined', () => {
    const headers = new Headers()
    const toBeMerged = {
      Authorization: undefined,
      'Content-Type': 'text/plain',
    }
    mergeHeaders({ headers, toBeMerged })
    expect(headers.has('Authorization')).toBe(false)
    expect(headers.get('Content-Type')).toBe('text/plain')
  })

  it('should let toBeMerged overwrite an existing header of the same name', () => {
    const headers = new Headers({ 'Content-Type': 'application/json' })
    const toBeMerged = { 'Content-Type': 'text/plain' }
    mergeHeaders({ headers, toBeMerged })
    expect(headers.get('Content-Type')).toBe('text/plain')
  })

  it('should leave headers untouched when toBeMerged is undefined', () => {
    const headers = new Headers({ 'Content-Type': 'application/json' })
    mergeHeaders({ headers, toBeMerged: undefined })
    expect(headers.get('Content-Type')).toBe('application/json')
    expect([...headers.keys()]).toHaveLength(1)
  })

  it('should merge entries from an actual Headers instance', () => {
    const headers = new Headers()
    const toBeMerged = new Headers({ Authorization: 'Bearer token' })
    mergeHeaders({ headers, toBeMerged })
    expect(headers.get('Authorization')).toBe('Bearer token')
  })
})
