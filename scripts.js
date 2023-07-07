// const createNewTask = (title, dueDate, priority, notes, tags) => {
SAMPLE_TASKS_DEFAULT = [
    [
        "apply for interview",
        "1686470158",
        "2",
        false,
        "mention Patrick's day",
        [],
    ],
    ["wash car", "1686271376", "1", false, null, []],
    ["finish the custard in fridge", "1686271376", "2", true, null, []],
    ["file tax returns", "1686271376", "1", false, null, []],
    ["get groceries", null, "1", false, "chilli, tomato, beetroot", []],
    ["go to gym", null, "0", false, null, []],
    ["cook that steak", null, "1", true, null, []],
    [
        "read cracking coding interview",
        null,
        "0",
        false,
        "don't forget the preface",
        [],
    ],
    // ["", "", "2", "", []],
];
SAMPLE_TASKS_COLLEGE = [
    ["finish math assignment", "1686026847", "1", false, null, []],
    [
        "email Vivian",
        null,
        "1",
        false,
        "science project: ask about the ppts",
        [],
    ],
    ["study for Friday!", "1687993415", "2", true, null, []],
    ["return library books", null, "0", false, "they are in cupboard", []],
    [
        "get a suit for prom",
        "1686216124",
        "2",
        true,
        "also get shoes and tie",
        [],
    ],
    // ["", "", "2", "", []],
];

const storage = (() => {
    // localStorage wrappers
    function readLs(key) {
        const localStorageTemp = localStorage.getItem(key);
        if (localStorageTemp !== null) return localStorageTemp;
        else return false;
    }

    function writeLs(key, value) {
        localStorage.setItem(key, value);
    }

    function clearLs() {
        localStorage.clear();
    }

    function saveObjectToLs(name, obj) {
        writeLs(name, JSON.stringify(obj));
    }

    return { readLs, saveObjectToLs, clearLs };
})();

const tasksBackend = (() => {
    const generateUUID = () => {
        let d = new Date().getTime(),
            d2 =
                (typeof performance !== "undefined" &&
                    performance.now &&
                    performance.now() * 1000) ||
                0;
        return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
            let r = Math.random() * 16;
            if (d > 0) {
                r = (d + r) % 16 | 0;
                d = Math.floor(d / 16);
            } else {
                r = (d2 + r) % 16 | 0;
                d2 = Math.floor(d2 / 16);
            }
            return (c == "x" ? r : (r & 0x7) | 0x8).toString(16);
        });
    };

    const createNewProject = (title) => {
        function Project() {
            this.id = null;
            this.title = null;
            this.tasks = [];

            this.renameProject = (title) => {
                this.title = title;
            };
        }

        const project = new Project();
        project.id = generateUUID();

        if (title === undefined) throw new Error("Title is mandatory");
        project.title = title;

        projects[title] = project;

        return project;
    };

    const createNewTask = (
        title,
        dueDate,
        priority,
        favourite,
        notes,
        tags
    ) => {
        function Task() {
            this.id = null;
            this.title = null;
            this.completed = false;
            this.dueDate = null;
            this.priority = "1";
            this.favourite = null;
            this.notes = null;
            this.tags = [];

            this.completed = () => {
                this.completed ? false : true;
                return this.completed;
            };

            this.favourite = () => {
                this.favourite ? false : true;
                return this.favourite;
            };

            this.setProperty = (property, value) => {
                // if (Object.getPrototypeOf(this).hasOwnProperty(property)) {
                if (property === "completed") {
                    throw new Error(
                        "Use the task.completed() method to update task completion status"
                    );
                } else if (property === "tags") {
                    if (!Array.isArray(value))
                        throw new Error("Supply tags in array format");
                } else if (property === "priority") {
                    switch (priority) {
                        case "0":
                            this.priority = "0";
                            break;
                        case "1":
                            this.priority = "1";
                            break;
                        case "2":
                            this.priority = "2";
                            break;
                        default:
                            throw new Error(
                                "Allowed values for priority are low(0), medium(1) and high(2)"
                            );
                    }
                } else {
                    this[property] = value;
                }
                // } else throw new Error(`${property} is an invalid property`);
            };
        }

        const task = new Task();
        task.id = generateUUID();

        if (title === undefined) throw new Error("Title is mandatory");
        else task.title = title;

        if (dueDate !== undefined) task.setProperty("dueDate", dueDate);
        if (priority !== undefined) task.setProperty("priority", priority);
        if (favourite !== undefined) task.setProperty("favourite", favourite);
        if (notes !== undefined) task.setProperty("notes", notes);
        if (tags !== undefined) task.setProperty("tags", tags);
        // if ( !== undefined) task.setProperty("",)
        // if ( !== undefined) task.setProperty("",)
        // if ( !== undefined) task.setProperty("",)

        // console.log(task.isCompleted());

        return task;
    };

    const addTaskToProject = (task, project) => {
        projects[project]["tasks"].push(task);
    };

    const reset = () => {
        createNewProject("default");

        SAMPLE_TASKS_DEFAULT.forEach((task) => {
            const t = createNewTask(...task);
            addTaskToProject(t, "default");
        });

        createNewProject("college");

        SAMPLE_TASKS_COLLEGE.forEach((task) => {
            const t = createNewTask(...task);
            addTaskToProject(t, "college");

            projects["college"]["tasks"].push(t);
        });

        storage.saveObjectToLs("projects", projects);
    };

    const projects = {};

    reset();

    return { projects };
})();

const DOM = (() => {})();

// console.table(tasksBackend.projects["default"]["tasks"]);
// console.table(tasksBackend.projects["college"]["tasks"]);
