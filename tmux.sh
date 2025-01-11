tmux -u new-session -d -s ecommerce -n backend
#start backend
tmux send-keys -t ecommerce:backend "cd backend && pnpm dev" enter


tmux new-window -t ecommerce -n frontend
#start backend
tmux send-keys -t ecommerce:frontend "cd frontend && npm run dev" enter


tmux new-window -t ecommerce -n studio
#start backend
tmux send-keys -t ecommerce:studio "cd backend && pnpm db:studio" enter


tmux new-window -t ecommerce -n zsh
tmux attach -t ecommerce