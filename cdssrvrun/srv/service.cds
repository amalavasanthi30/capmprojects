using {bookshop as db} from '../db/schema';

service CatalogService {
  entity Books as projection on db.Books;
  action callCourse() returns String;

}

service CourseService{
      entity course as projection on db.course;
}

