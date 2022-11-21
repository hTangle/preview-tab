import {EngineName, GoogleSearch, SearchEngine} from "@/types/search";
import {LStorage} from "@/service/storage_service";

const searchEngineKey = "tab_search_engine"

export function getSearchUrl(engine: SearchEngine, search: string) {
  switch (engine.name) {
    case EngineName.google:
      return engine.url + search.replaceAll(" ", "+")
    case EngineName.baidu:
      return engine.url + search
    case EngineName.bing:
      return engine.url + search.replaceAll(" ", "+")
  }
  return engine.url + search
}


export function setDefaultSearchEngine(engine: SearchEngine) {
  LStorage.set(searchEngineKey, engine)
}

export function getCurrentSearchEngine() {
  const engine: SearchEngine = LStorage.get(searchEngineKey)
  if (engine && engine.name) {
    return engine
  }
  return GoogleSearch
}
