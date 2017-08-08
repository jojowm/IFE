import san from 'san'

import {router} from 'san-router'

import Todo from 'components/todo.san'

router.add({rule: '/', Component: Todo, target: '#app'})

// start
router.start()
