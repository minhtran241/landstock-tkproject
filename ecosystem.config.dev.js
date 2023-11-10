module.exports = {
    apps: [
        {
            name: 'landstock-api.main.dev',
            script: 'npm',
            args: 'start',
            instances: 1, // Set the number of instances (nodes)
            autorestart: true,
            watch: true,
            max_memory_restart: '1G',
        },
    ],
};
