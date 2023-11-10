module.exports = {
    apps: [
        {
            name: 'landstock-api.main.mbls',
            script: 'app.js',
            instances: 2, // Set the number of instances (nodes)
            exec_mode: 'cluster', // Enable cluster mode
            autorestart: true,
            watch: true,
            max_memory_restart: '1G',
            log_date_format: 'YYYY-MM-DD HH:mm Z',
            error_file: '/root/landstock-dev/logs/error.log',
            out_file: '/root/landstock-dev/logs/out.log',
            log_file: '/root/landstock-dev/logs/combined.log',
            merge_logs: true,
            log_rotate_date: true, // Enable log rotation based on date
            max_size: '10M', // Optional: Rotate logs when the total size exceeds 10 megabytes
            keep_logs: 14, // Optional: Keep logs for the last 14 days
        },
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
