/**
 * Created by weimin on 2017/7/26.
 */
const data = [
    {
        priority: "first-priority",
        progress: "doing",
        content: "Some text about task 1,Some text about task 1,Some text about task 1"
    },
    {
        priority: "third-priority",
        progress: "to-do",
        content: "Some text about task 2,Some text about task 2,Some text about task 2"
    },
    {
        priority: "second-priority",
        progress: "done",
        content: "Some text about task 3,Some text about task 3,Some text about task 3"
    },
    {
        priority: "first-priority",
        progress: "to-do",
        content: "Some text about task 4,Some text about task 4,Some text about task 4"
    },
    {
        priority: "second-priority",
        progress: "to-do",
        content: "Some text about task 5,Some text about task 5,Some text about task 5"
    },
    {
        priority: "third-priority",
        progress: "done",
        content: "Some text about task 6,Some text about task 6,Some text about task 6"
    },
    {
        priority: "first-priority",
        progress: "doing",
        content: "Some text about task 7,Some text about task 7,Some text about task 7"
    }
];

localStorage.setItem('listData', JSON.stringify(data));

// export {
//     data
// }

// export default data
