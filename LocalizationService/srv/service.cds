using {schema as db} from '../db/schema';

service CatalogService {

  entity Products as projection on db.Products;
}
//annotate  db.Products with @odata.draft.enabled;