module.exports = (db) => {

  const getTutorCourses = async () => {
    const years = {1: 'first_year', 2: 'second_year', 3: 'third_year'};
    const courses = {};
    const coursePromises = [];
    for(const year in years) {
      coursePromises.push(getCoursesByYear(year));
    }

    await Promise.all(coursePromises).then(allCourses => {

      /* 
        Formatting the courses object to appear as --> 
        courses = {
          first_year = {
            sortCoursesBySubject(allCourses[year - 1]) <-- index is (year - 1) to account for allCourses index
                                                           starting at 0, where years starts at 1
          }
        }
      */
      for(const year in years) {
        courses[years[year]] = sortCoursesBySubject(allCourses[year - 1]);
      }
    })
    .catch(error => console.log(error));

    return courses;
  }

  // courses is optional as we can either filter a passed list or directly query the db for the list
  const getCoursesByYear = (year, courses = null) => {
    const query = 
    `
    SELECT * FROM courseItems
    WHERE year = ${year};
    `;

    return db.query(query).then(data => data.rows);

  }

  const sortCoursesBySubject = (courses) => {
    const coursesBySubject = {};

    for(const course of courses) {
      if(!coursesBySubject[course.subject]) {
        coursesBySubject[course.subject] = [course];
      } else {
        coursesBySubject[course.subject].push(course);
      }
    }
    return coursesBySubject;

  }

  return { getTutorCourses };
}



// This needs to be added to the README.md
/* 
  courses = {
    first_year = {
      MATH: [
        {
          name: 'MATH 275',
          title: 'Calculus for Engineers and Scientists',
          year: 1
        },
        {
          name: 'MATH 211',
          title: 'Linear Methods',
          year: 1
        }
      ],
      ENGG: [
        {
          name: 'ENGG 201',
          title: 'Solids, Liquids, and Gases',
          year: 1
        }
      ]
    },
    second_year = {
      MATH: [
        {
          name: 'MATH 375',
          title: 'Differential Equations',
          year: 2
        }
      ]
    }
  }
*/