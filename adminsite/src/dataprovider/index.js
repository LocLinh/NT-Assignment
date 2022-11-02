import axios from "axios";
const apiUrl = "http://localhost:3000/api";

dataProvider.getList('posts', {
    pagination: { page: 1, perPage: 5 },
    sort: { field: 'title', order: 'ASC' },
    filter: { author_id: 12 },
});
dataProvider.getOne('posts', { id: 123 });
dataProvider.getMany('posts', { ids: [123, 124, 125] });
dataProvider.getManyReference('comments', {
    target: 'post_id',
    id: 123,
    sort: { field: 'created_at', order: 'DESC' }
});
dataProvider.create('posts', { data: { title: "hello, world" } });
dataProvider.update('posts', {
    id: 123,
    data: { title: "hello, world!" },
    previousData: { title: "previous title" }
});
dataProvider.updateMany('posts', {
    ids: [123, 234],
    data: { views: 0 },
});
dataProvider.delete('posts', {
    id: 123,
    previousData: { title: "hello, world" }
});
dataProvider.deleteMany('posts', { ids: [123, 234] });