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
            log_type: 'json',
            error_file: '/root/landstock-prod/logs/error.log',
            out_file: '/root/landstock-prod/logs/out.log',
            log_file: '/root/landstock-prod/logs/combined.log',
            merge_logs: true,
        },
        {
            name: 'landstock-api.main.dev',
			script: 'app.js',
            instances: 1, // Set the number of instances (nodes)
            autorestart: true,
            watch: true,
            max_memory_restart: '1G',
        },
    ],
};
