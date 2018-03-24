export class AppConfig {

  public static sideMenuConfig: any = {
    'menu': [{
      'role' : '1',
      'parent': 'name_class',
      'css': 'fa fa-university',
      'child': [{
        'name': 'add_class',
        'ref': 'class/new'
      }, {
        'name': 'list_class',
        'ref': 'list/class'
      }]
    }, {
      'role' : '1',
      'parent': 'name_teacher',
      'css': 'fa fa-users',
      'child': [{
        'name': 'add_teacher',
        'ref': 'teacher/new'
      }, {
        'name': 'list_teacher',
        'ref': 'list/teacher'
      }]
    }, {
      'role' : '0',
      'parent': 'name_student',
      'css': 'fa fa-child',
      'child': [{
        'name': 'add_student',
        'ref': 'student/new'
      }, {
        'name': 'list_student',
        'ref': 'list/student'
      }]
    }, {
      'role' : '2',
      'parent': 'name_attendance',
      'css': 'fa fa-check',
      'child': [{
        'name': 'add_attendance',
        'ref': 'attendance/new'
      }, {
        'name': 'list_attendance',
        'ref': 'list/attendance'
      }]
    }, {
      'role' : '2',
      'parent': 'name_home_work',
      'css': 'fa fa-pencil',
      'child': [{
        'name': 'add_home_work',
        'ref': 'homeWork/new'
      }, {
        'name': 'list_home_work',
        'ref': 'list/homeW'
      }]
    }, {
      'role' : '2',
      'parent': 'name_time_table',
      'css': 'fa fa-table',
      'child': [{
        'name': 'add_time_table',
        'ref': 'timeTable/new'
      }, {
        'name': 'list_time_table',
        'ref': 'list/timeT'
      }]
    }, {
      'role' : '2',
      'parent': 'name_result',
      'css': 'fa fa-server',
      'child': [{
        'name': 'add_exam',
        'ref': 'exam/new'
      }, {
        'name': 'list_exam',
        'ref': 'list/exam'
      }, {
        'name': 'add_marks',
        'ref': 'result/new'
      }, {
        'name': 'list_marks',
        'ref': 'list/result'
      }]
    }, {
      'role' : '3',
      'parent': 'name_driver',
      'css': 'fa fa-user',
      'child': [{
        'name': 'add_driver',
        'ref': 'driver/new'
      }, {
        'name': 'list_driver',
        'ref': 'list/driver'
      }]
    }, {
      'role' : '3',
      'parent': 'name_bus',
      'css': 'fa fa-bus',
      'child': [{
        'name': 'add_bus',
        'ref': 'bus/new'
      }, {
        'name': 'list_bus',
        'ref': 'list/bus'
      }]
    }, {
      'role' : '3',
      'parent': 'name_route',
      'css': 'fa fa-map-o',
      'child': [{
        'name': 'add_bus_stop',
        'ref': 'busStop/new'
      }, {
        'name': 'list_bus_stop',
        'ref': 'list/busS'
      }, {
        'name': 'add_route',
        'ref': 'route/new'
      }, {
        'name': 'list_route',
        'ref': 'list/route'
      }]
    }, {
      'role' : '1',
      'parent': 'name_library',
      'css': 'fa fa-book',
      'child': [{
        'name': 'add_book',
        'ref': 'book/new'
      }, {
        'name': 'list_book',
        'ref': 'list/book'
      }]
    }, {
      'role' : '1',
      'parent': 'name_gallery',
      'css': 'fa fa-image',
      'child': [{
        'name': 'add_album',
        'ref': 'album/new'
      }, {
        'name': 'list_album',
        'ref': 'list/album'
      }]
    }, {
      'role' : '1',
      'parent': 'name_notification',
      'css': 'fa fa-bell-o',
      'child': [{
        'name': 'add_notification',
        'ref': 'notification/new'
      }, {
        'name': 'list_notification',
        'ref': 'list/notification'
      }]
    }]
  };

  public static tableNavigationConfig: any = {
    'class': {
      'addRef': '../../class/new',
      'viewRef': '../../class/view',
      'editRef': '../../class/edit'
    },
    'teacher': {
      'addRef': '../../teacher/new',
      'viewRef': '../../teacher/view',
      'editRef': '../../teacher/edit'
    },
    'student': {
      'addRef': '../../student/new',
      'viewRef': '../../student/view',
      'editRef': '../../student/edit'
    },
    'attendance': {
      'addRef': '../../attendance/new',
      'viewRef': '../../attendance/view',
      'editRef': '../../attendance/edit'
    },
    'homeW': {
      'addRef': '../../homeWork/new',
      'viewRef': '../../homeWork/view',
      'editRef': '../../homeWork/edit'
    },
    'timeT': {
      'addRef': '../../timeTable/new',
      'viewRef': '../../timeTable/view',
      'editRef': '../../timeTable/edit'
    },
    'exam': {
      'addRef': '../../exam/new',
      'viewRef': '../../exam/view',
      'editRef': '../../exam/edit'
    },
    'result': {
      'addRef': '../../result/new',
      'viewRef': '../../result/view',
      'editRef': '../../result/edit'
    },
    'driver': {
      'addRef': '../../driver/new',
      'viewRef': '../../driver/view',
      'editRef': '../../driver/edit'
    },
    'busS': {
      'addRef': '../../busStop/new',
      'viewRef': '../../busStop/view',
      'editRef': '../../busStop/edit'
    },
    'bus': {
      'addRef': '../../bus/new',
      'viewRef': '../../bus/view',
      'editRef': '../../bus/edit'
    },
    'route': {
      'addRef': '../../route/new',
      'viewRef': '../../route/view',
      'editRef': '../../route/edit'
    },
    'book': {
      'addRef': '../../book/new',
      'viewRef': '../../book/view',
      'editRef': '../../book/edit'
    },
    'album': {
      'addRef': '../../album/new',
      'viewRef': '../../album/view',
      'editRef': '../../album/edit'
    },
    'notification': {
      'addRef': '../../notification/new',
      'viewRef': '../../notification/view',
      'editRef': '../../notification/edit'
    },
  };

  public static class: any = [
    { prop: 'class' },
    { prop: 'division' },
  ];

  public static teacher: any = [
    { prop: 'name' },
    { prop: 'contactNo' },
    { prop: 'email' }
  ];

  public static student: any = [
    { prop: 'roll_no' },
    { prop: 'fname' },
    { prop: 'lname' },
    { prop: 'class' },
    { prop: 'division' }
  ];

  public static attendance: any = [
    { prop: 'class' },
    { prop: 'division' },
    { prop: 'date' }
  ];

  public static homeW: any = [
    { prop: 'class' },
    { prop: 'division' },
    { prop: 'date' }
  ];

  public static timeT: any = [
    { prop: 'class' },
    { prop: 'division' },
    { prop: 'date' },
    { prop: 'day' }
  ];

  public static exam: any = [
    { prop: 'name' },
    { prop: 'class' },
    { prop: 'division' },
    { prop: 'date' }
  ];

  public static result: any = [
    { prop: 'name' },
    { prop: 'class' },
    { prop: 'division' },
    { prop: 'count' },
    { prop: 'result' }
  ];

  public static driver: any = [
    { prop: 'firstName' },
    { prop: 'lastName' },
    { prop: 'contactNo' }
  ];

  public static bus: any = [
    { prop: 'bus_no' },
    { prop: 'driver' },
    { prop: 'route' }
  ];

  public static busS: any = [
    { prop: 'stopName' }
  ];

  public static route: any = [
    { prop: 'name' },
    { prop: 'from' },
    { prop: 'to' }
  ];

  public static book: any = [
    { prop: 'bookName' },
    { prop: 'authors' },
    { prop: 'bookType' },
    { prop: 'subject' },
    { prop: 'isbn' }
  ];

  public static album: any = [
    { prop: 'name' },
    { prop: 'count' }
  ];

  public static notification: any = [
    { prop: 'title' },
    { prop: 'class' },
    { prop: 'division' },
    { prop: 'date' }
  ];

}
