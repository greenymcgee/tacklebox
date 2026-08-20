import { Summon } from '../summon'
import { Summoner } from '../summoner'

const BASE_OPTIONS = {
  baseURL: 'http://greeny.nothing',
  headers: { 'content-type': 'application/json' },
}

const SUMMONER = new Summoner(BASE_OPTIONS)

vi.spyOn(Summon, 'delete')
vi.spyOn(Summon, 'get')
vi.spyOn(Summon, 'patch')
vi.spyOn(Summon, 'post')
vi.spyOn(Summon, 'put')

beforeEach(() => {
  vi.clearAllMocks()
})

afterAll(() => {
  vi.restoreAllMocks()
})

describe('Summoner', () => {
  describe('delete', () => {
    it('should call Summon.delete with predefined options', async () => {
      vi.mocked(Summon.delete).mockImplementation(vi.fn())
      const options = { headers: { accept: 'application/json' } }
      await SUMMONER.delete('/pathname', options)
      expect(Summon.delete).toHaveBeenCalledWith(
        `${BASE_OPTIONS.baseURL}/pathname`,
        {
          headers: new Headers({ ...BASE_OPTIONS.headers, ...options.headers }),
        },
      )
    })
  })

  describe('get', () => {
    it('should call Summon.get with predefined options', async () => {
      vi.mocked(Summon.get).mockImplementation(vi.fn())
      const options = { headers: { accept: 'application/json' } }
      await SUMMONER.get('/pathname', options)
      expect(Summon.get).toHaveBeenCalledWith(
        `${BASE_OPTIONS.baseURL}/pathname`,
        {
          headers: new Headers({ ...BASE_OPTIONS.headers, ...options.headers }),
        },
      )
    })
  })

  describe('patch', () => {
    it('should call Summon.patch with predefined options', async () => {
      vi.mocked(Summon.patch).mockImplementation(vi.fn())
      const options = { headers: { accept: 'application/json' } }
      await SUMMONER.patch('/pathname', options)
      expect(Summon.patch).toHaveBeenCalledWith(
        `${BASE_OPTIONS.baseURL}/pathname`,
        {
          headers: new Headers({ ...BASE_OPTIONS.headers, ...options.headers }),
        },
      )
    })
  })

  describe('post', () => {
    it('should call Summon.post with predefined options', async () => {
      vi.mocked(Summon.post).mockImplementation(vi.fn())
      const options = { headers: { accept: 'application/json' } }
      await SUMMONER.post('/pathname', options)
      expect(Summon.post).toHaveBeenCalledWith(
        `${BASE_OPTIONS.baseURL}/pathname`,
        {
          headers: new Headers({ ...BASE_OPTIONS.headers, ...options.headers }),
        },
      )
    })
  })

  describe('put', () => {
    it('should call Summon.put with predefined options', async () => {
      vi.mocked(Summon.put).mockImplementation(vi.fn())
      const options = { headers: { accept: 'application/json' } }
      await SUMMONER.put('/pathname', options)
      expect(Summon.put).toHaveBeenCalledWith(
        `${BASE_OPTIONS.baseURL}/pathname`,
        {
          headers: new Headers({ ...BASE_OPTIONS.headers, ...options.headers }),
        },
      )
    })
  })

  describe('options', () => {
    vi.mocked(Summon.get).mockImplementation(vi.fn())

    it('should accept blank options', async () => {
      const url = 'http://greeny.no/pathname'
      const summoner = new Summoner()
      await summoner.get(url)
      expect(Summon.get).toHaveBeenCalledWith(url, { headers: new Headers() })
    })

    it('should accept a blank baseURL', async () => {
      const url = 'http://greeny.no/pathname'
      const summoner = new Summoner({
        headers: { 'content-type': 'application/json' },
      })
      const options = { headers: { accept: 'application/json' } }
      await summoner.get(url, options)
      expect(Summon.get).toHaveBeenCalledWith(url, {
        headers: new Headers({
          ...options.headers,
          'content-type': 'application/json',
        }),
      })
    })

    it('should accept blank headers', async () => {
      const summoner = new Summoner({ baseURL: 'http://greeny.no' })
      const options = { headers: { accept: 'application/json' } }
      await summoner.get('/pathname', options)
      expect(Summon.get).toHaveBeenCalledWith('http://greeny.no/pathname', {
        headers: new Headers(options.headers),
      })
    })
  })
})
